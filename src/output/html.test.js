const { useDropRoundPoints } = require("./html");
const { leagueRef } = require("../state/league");

describe("useDropRoundPoints", () => {
  const event = (fields = {}) => ({
    standings: { driverStandings: [] },
    ...fields
  });
  const events = count => Array.from({ length: count }, () => event());

  beforeEach(() => {
    leagueRef.league = {
      dropLowestScoringRoundsNumber: 1,
      sortByDropRoundPoints: true
    };
    leagueRef.endTime = null;
    leagueRef.showLivePoints = () => false;
  });

  test("uses total points while rounds driven do not exceed drop rounds", () => {
    expect(useDropRoundPoints({ events: [] })).toBe(false);
    expect(useDropRoundPoints({ events: events(1) })).toBe(false);
  });

  test("uses drop round points once more rounds than drop rounds are driven", () => {
    expect(useDropRoundPoints({ events: events(2) })).toBe(true);
  });

  test("ignores the active event when live points are not shown", () => {
    leagueRef.endTime = "2026-09-20T18:00:00Z";
    expect(useDropRoundPoints({ events: events(2) })).toBe(false);
    leagueRef.showLivePoints = () => true;
    expect(useDropRoundPoints({ events: events(2) })).toBe(true);
  });

  test("ignores events without standings", () => {
    expect(useDropRoundPoints({ events: [event(), {}] })).toBe(false);
  });

  test("weights rounds by endurance multiplier", () => {
    leagueRef.league.dropLowestScoringRoundsNumber = 2;
    expect(useDropRoundPoints({ events: events(2) })).toBe(false);
    expect(
      useDropRoundPoints({
        events: [event({ enduranceRoundMultiplier: 2 }), event()]
      })
    ).toBe(true);
  });

  test("uses total points when standings are not sorted by drop round points", () => {
    leagueRef.league.sortByDropRoundPoints = false;
    expect(useDropRoundPoints({ events: events(3) })).toBe(false);
  });

  test("uses total points when there are no drop rounds", () => {
    leagueRef.league.dropLowestScoringRoundsNumber = 0;
    expect(useDropRoundPoints({ events: events(3) })).toBe(false);
  });
});
