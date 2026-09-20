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

// Deliberately not output.js's checkOutputDirs(): that one also clears the
// cache dir and is driven by whatever CLUB happens to be set.
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

// leagueRef is normally built by league.js init(), which loads drivers from
// CSV/Sheets. The snapshot already carries its drivers per division, so we
// rebuild only the members the output layer actually reads.
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
    // Drivers who only ever appear in results (guests, name changes) still
    // need to render rather than crash the page.
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

  // Keep the active event genuinely "live" so the countdown, live points and
  // active-event styling are always visible, however old the snapshot gets.
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
  buildLeagueRef(snapshot);
  writeAllHTML();

  const pages = fs
    .readdirSync(`${outputPath}/website`)
    .filter(file => file.endsWith(".html"));
  console.log(`rendered ${pages.length} pages from snapshot`);
};

render();
