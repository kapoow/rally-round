/**
 * Renders the website from a committed snapshot of a processed league.
 *
 * The snapshot (src/__fixtures__/preview/leagueResults.json) is the real
 * output of a full championship: 9 events, 8 finished and 1 active, with real
 * drivers, points, DNF/DNS rows and a live countdown. That makes it the
 * fixture to design against - the e2e club only has 3 processed events, which
 * hides every wide-table problem.
 *
 * Rendering skips fetching and championship processing entirely: it loads the
 * already-processed league object straight into leagueRef and calls
 * writeAllHTML(). No credentials, no network, sub-second rebuilds.
 *
 * CLUB is pinned to "preview" so output lands in ./hidden/out/preview and can
 * never overwrite a real club's generated results.
 */
process.env.CLUB = "preview";
process.env.KEEP_LOCAL_CACHE = "true";

const fs = require("fs");
const path = require("path");
const copydir = require("copy-dir");
const moment = require("moment");

const snapshotPath = path.resolve(
  __dirname,
  "../src/__fixtures__/preview/leagueResults.json"
);

const { leagueRef } = require("../src/state/league");
const { writeAllHTML } = require("../src/output/html");
const { outputPath } = require("../src/shared");
const { getLocalization } = require("../src/output/localization");

// Not output.js's checkOutputDirs(): that also clears the cache and follows CLUB.
const prepareOutputDir = () => {
  const resolved = path.resolve(outputPath);
  if (path.basename(resolved) !== "preview") {
    throw new Error(
      `refusing to write snapshot output to ${resolved} - expected the preview club`
    );
  }
  fs.existsSync(resolved) && fs.rmSync(resolved, { recursive: true });
  fs.mkdirSync(`${resolved}/website`, { recursive: true });
  copydir.sync("./assets", `${resolved}/website/assets`);
};

const lookupDriver = (divisionDrivers, name) => {
  const upper = name.toUpperCase();
  return (
    divisionDrivers.driversById[upper] ||
    divisionDrivers.driversByRaceNet[upper] ||
    divisionDrivers.driversByName3[upper]
  );
};

// The snapshot carries its own drivers, so rebuild only what the output layer reads.
const TIER_A_SIZE = 5;
const TIERS = [
  { divisionName: "tiera", displayName: "Tier A" },
  { divisionName: "tierb", displayName: "Tier B" }
];

const clone = value => JSON.parse(JSON.stringify(value));

const positionsByName = standings =>
  standings.reduce((positions, row) => {
    positions[row.name] = row.currentPosition;
    return positions;
  }, {});

const rankStandings = (rows, previousPositions) =>
  rows.map((row, index) => {
    const currentPosition = index + 1;
    const previousPosition = previousPositions[row.name];
    return {
      ...row,
      currentPosition,
      previousPosition:
        previousPosition === undefined ? null : previousPosition,
      positionChange:
        previousPosition === undefined
          ? null
          : previousPosition - currentPosition
    };
  });

// teamPoints is only set on drivers who counted, so these are plain sums.
const buildTeamResults = (driverResults, teamIds, divisionName) => {
  const totals = {};
  const counted = {};
  teamIds.forEach(teamId => {
    totals[teamId] = 0;
    counted[teamId] = 0;
  });
  driverResults.forEach(result => {
    if (result.teamPoints == null || totals[result.teamId] === undefined)
      return;
    totals[result.teamId] += result.teamPoints;
    counted[result.teamId] += 1;
  });
  return Object.keys(totals)
    .map(name => ({
      name,
      totalPoints: totals[name],
      driverResultsCounted: counted[name],
      divisionName,
      pointsDisplay: totals[name]
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints);
};

const buildTeamStandings = (eventsSoFar, divisionName) => {
  const totals = {};
  eventsSoFar.forEach(event =>
    event.results.teamResults.forEach(result => {
      totals[result.name] = (totals[result.name] || 0) + result.totalPoints;
    })
  );
  return Object.keys(totals)
    .map(name => ({
      name,
      previousPosition: null,
      divisionName,
      totalPoints: totals[name],
      // No team drew a drop round here, so ADR tracks the running total.
      totalPointsAfterDropRounds: totals[name],
      droppedRoundIndexes: [],
      currentPosition: 0,
      positionChange: null
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints);
};

const buildEvents = ({
  sourceEvents,
  names,
  divisionName,
  divisionNameFor,
  teamIds
}) => {
  let previousDrivers = {};
  let previousTeams = {};
  const events = [];

  sourceEvents.forEach(sourceEvent => {
    const event = clone(sourceEvent);
    event.divisionName = divisionName;
    event.leaderboardStages = (event.leaderboardStages || []).map(stage => ({
      ...stage,
      entries: (stage.entries || []).filter(entry => names.has(entry.name))
    }));

    const driverResults = (event.results.driverResults || [])
      .filter(result => names.has(result.name))
      .map(result => ({
        ...result,
        divisionName: divisionNameFor(result.name)
      }));
    event.results = {
      driverResults,
      teamResults: buildTeamResults(driverResults, teamIds, divisionName)
    };
    event.driverLegsResults = (event.driverLegsResults || []).filter(result =>
      names.has(result.name)
    );

    const driverRows = (event.standings.driverStandings || [])
      .filter(row => names.has(row.name))
      .map(row => ({ ...row, divisionName: divisionNameFor(row.name) }));

    events.push(event);
    event.standings = {
      driverStandings: rankStandings(driverRows, previousDrivers),
      teamStandings: rankStandings(
        buildTeamStandings(events, divisionName),
        previousTeams
      )
    };
    previousDrivers = positionsByName(event.standings.driverStandings);
    previousTeams = positionsByName(event.standings.teamStandings);
  });

  return events;
};

const buildDivision = ({
  source,
  divisionName,
  displayName,
  names,
  divisionNameFor
}) => {
  const division = clone(source);
  division.divisionName = divisionName;
  division.displayName = displayName;

  const lookups = division.drivers || {};
  division.drivers = Object.keys(lookups).reduce((filtered, lookup) => {
    filtered[lookup] = Object.fromEntries(
      Object.entries(lookups[lookup]).filter(([, driver]) =>
        names.has(driver.name)
      )
    );
    return filtered;
  }, {});

  const teamIds = [
    ...new Set(
      Object.values(division.drivers.driversById || {})
        .map(driver => driver.teamId)
        .filter(Boolean)
    )
  ];

  division.events = buildEvents({
    sourceEvents: source.events || [],
    names,
    divisionName,
    divisionNameFor,
    teamIds
  });
  division.upcomingEvents = (source.upcomingEvents || []).map(event => ({
    ...clone(event),
    divisionName
  }));
  return division;
};

const splitIntoTiers = snapshot => {
  const source = Object.values(snapshot.divisions)[0];
  const finalOrder = [...source.events.at(-1).standings.driverStandings].sort(
    (a, b) => a.currentPosition - b.currentPosition
  );
  const tierNameSets = [
    new Set(finalOrder.slice(0, TIER_A_SIZE).map(row => row.name)),
    new Set(finalOrder.slice(TIER_A_SIZE).map(row => row.name))
  ];
  const tierOf = name => {
    const index = tierNameSets.findIndex(names => names.has(name));
    return index === -1
      ? TIERS[TIERS.length - 1].divisionName
      : TIERS[index].divisionName;
  };

  snapshot.divisions = TIERS.reduce((divisions, tier, index) => {
    divisions[tier.divisionName] = buildDivision({
      source,
      divisionName: tier.divisionName,
      displayName: tier.displayName,
      names: tierNameSets[index],
      divisionNameFor: () => tier.divisionName
    });
    return divisions;
  }, {});

  // Rows keep their tier name: that is what fills the Div column.
  snapshot.overall = buildDivision({
    source,
    divisionName: "overall",
    displayName: getLocalization().overall,
    names: new Set(finalOrder.map(row => row.name)),
    divisionNameFor: tierOf
  });
  snapshot.disableOverall = false;
  snapshot.currentDivision = snapshot.overall;
  return snapshot;
};

const buildLeagueRef = snapshot => {
  leagueRef.league = snapshot;
  leagueRef.divisions = snapshot.divisions;

  leagueRef.getDriverInDivision = (name, divisionName) => {
    const division =
      divisionName === "overall"
        ? snapshot.overall
        : snapshot.divisions[divisionName];
    const found =
      division && division.drivers && lookupDriver(division.drivers, name);
    // Guests and renamed drivers must still render rather than crash the page.
    return found || { id: name.toUpperCase(), name };
  };
  leagueRef.getDriver = name =>
    leagueRef.getDriverInDivision(
      name,
      snapshot.currentDivision && snapshot.currentDivision.divisionName
    );

  leagueRef.hasTeams = !snapshot.disableTeams;
  leagueRef.hasCars = true;
  leagueRef.includeOverall =
    Object.keys(snapshot.divisions).length > 1 && !snapshot.disableOverall;

  // Keep the active event live so the countdown and live styling stay visible.
  leagueRef.endTime = moment()
    .add(1, "day")
    .add(6, "hours")
    .format("YYYY-MM-DD HH:mm:ss");
  leagueRef.activeCountryCode = findActiveCountry(snapshot);
  leagueRef.showLivePoints = () => !!snapshot.showLivePoints;

  leagueRef.getBackgroundStyle = () => snapshot.backgroundStyle || "";
};

const findActiveCountry = snapshot => {
  for (const division of Object.values(snapshot.divisions)) {
    const active = (division.events || []).find(
      event => event.eventStatus === "Active"
    );
    if (active) {
      const { getLocation } = require("../src/output/shared");
      return getLocation(active).countryCode;
    }
  }
  return null;
};

const render = () => {
  if (!fs.existsSync(snapshotPath)) {
    throw new Error(`snapshot not found at ${snapshotPath}`);
  }
  const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));

  prepareOutputDir();
  buildLeagueRef(splitIntoTiers(snapshot));
  writeAllHTML();

  const pages = fs
    .readdirSync(`${outputPath}/website`)
    .filter(file => file.endsWith(".html"));
  console.log(`rendered ${pages.length} pages from snapshot`);
};

render();
