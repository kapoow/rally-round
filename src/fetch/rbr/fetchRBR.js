const {
  formatDuration,
  getDuration,
  recalculateDiffs,
  eventStatuses,
  getCountryForAnyCode,
  mergeEvent,
  createDNFResult
} = require("../../shared");
const Papa = require("papaparse");
const moment = require("moment-timezone");
const { leagueRef } = require("../../state/league");
const { fetchResults, fetchStandings } = require("../../api/rbr/rbrApi");
const { keyBy } = require("lodash");

// sometimes comments can contain invalid values leading to an invalid csv
const stripComments = eventResultsCsv => {
  const lines = eventResultsCsv.split("\n");
  const newLines = lines.map(line => {
    const columns = line.split(";");
    // comment column is the last column (13th), just use the first 12 columns
    const newColumns = columns.slice(0, 12);
    return newColumns.join(";");
  });
  return newLines.join("\n");
};

const processCsv = (eventResultsCsv, eventStandingsCsv, event) => {
  const standings = Papa.parse(eventStandingsCsv, {
    header: true,
    skipEmptyLines: true
  }).data;

  const standingsByUserName = keyBy(standings, "user_name");
  const strippedEventsResultCsv = stripComments(eventResultsCsv);

  const results = Papa.parse(strippedEventsResultCsv, {
    header: true,
    skipEmptyLines: true
  });
  // convert into leaderboardStages -> entries (per stage)
  const resultRows = results.data;
  const numStages = event.numStages;
  const leaderboardStages = Array.from(Array(numStages), () => ({
    entries: []
  }));
  resultRows.forEach(row => {
    const stageDuration = moment.duration(parseFloat(row.time3), "seconds");
    const superRally = standingsByUserName[row["User name"]]
      ? Number(standingsByUserName[row["User name"]].super_rally)
      : null;
    const commonResult = {
      name: row["User name"],
      isDnfEntry: false,
      vehicleName: row["Car name"],
      vehicleClass: row["Group"],
      nationality: row.Nationality,
      comment: row.comment,
      stageTime: formatDuration(stageDuration),
      superRally
    };

    const actualResult = row.time3
      ? commonResult
      : { ...commonResult, ...createDNFResult(commonResult.name, false).entry };
    const stageIndex = row.SS - 1;
    leaderboardStages[stageIndex].entries.push(actualResult);
  });

  // calc total time
  for (let i = 0; i < numStages; i++) {
    const stageResults = leaderboardStages[i].entries;
    stageResults.forEach(result => {
      if (i === 0) {
        result.totalTime = result.stageTime;
      } else {
        const previousResult = leaderboardStages[i - 1].entries.find(
          prevResult => prevResult.name === result.name
        );
        result.totalTime = formatDuration(
          getDuration(previousResult.totalTime).add(
            getDuration(result.stageTime)
          )
        );
      }
    });
    recalculateDiffs(stageResults);
  }
  return {
    leaderboardStages,
    ...event
  };
};

const fetchEventPartForId = async (rally, rallyId) => {
  const eventFinished = isFinished(rally);
  const eventResultsCsv = await fetchResults(rallyId, isFinished(rally));
  const eventStandingsCsv = await fetchStandings(rallyId, isFinished(rally));
  const processedEvent = processCsv(eventResultsCsv, eventStandingsCsv, rally);
  if (eventFinished) {
    processedEvent.eventStatus = eventStatuses.finished;
  }
  return processedEvent;
};

const fetchEvent = async rally => {
  // an event can be constructed from 2 separate rallies by passing in multiple event ids.
  // results get merged into the one event.
  const rallyIdsForEvent = rally.eventId ? [rally.eventId] : rally.eventIds;
  const processedEventParts = [];
  for (const rallyId of rallyIdsForEvent) {
    const eventPart = await fetchEventPartForId(rally, rallyId);
    processedEventParts.push(eventPart);
  }
  const mergedEvent = processedEventParts[0];
  for (let i = 1; i < processedEventParts.length; i++) {
    mergeEvent(mergedEvent, processedEventParts[i]);
  }
  return mergedEvent;
};

const isFinished = rally => {
  const rallyEndTime = moment.tz(rally.endTime, "CET");
  return rallyEndTime.isBefore(moment());
};

const getActiveEvent = ({ division }) => {
  const activeEvent = division.rbr.rallies.find(rally => {
    const rallyEndTime = moment.tz(rally.endTime, "CET");
    return rallyEndTime.isAfter(moment());
  });
  return activeEvent;
};

const setCurrentEventEndTime = activeEvent => {
  if (activeEvent) {
    leagueRef.endTime = moment
      .tz(activeEvent.endTime, "CET")
      .utc()
      .toISOString();
    leagueRef.activeCountryCode = getCountryForAnyCode(
      activeEvent.locationFlag
    ).code;
  }
};

const fetchRBREvents = async ({ division }) => {
  const activeEvent = getActiveEvent({ division });
  if (activeEvent) {
    activeEvent.eventStatus = eventStatuses.active;
    setCurrentEventEndTime(activeEvent);
  }
  const events = [];
  const rallies = division.rbr.rallies;
  for (const rally of rallies) {
    const fetchedEvent = await fetchEvent(rally);
    events.push(fetchedEvent);
  }
  return events;
};

module.exports = {
  fetchRBREvents,
  // tests
  processCsv
};
