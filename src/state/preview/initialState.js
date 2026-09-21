// Preview-only club: gives the snapshot renderer its own CLUB and output dir.
// Every value is overridden by src/__fixtures__/preview/leagueResults.json.
const initialState = {
  pointsForDNF: false,
  useStandingsForHome: false,
  disableOverall: true,
  siteTitlePrefix: "PREVIEW",
  logo: "SRS.png",
  theme: "dark",
  teamOverride: {},
  historicalSeasonLinks: [],
  divisions: {
    preview: {
      divisionName: "preview",
      displayName: "Preview",
      events: [],
      points: {
        overall: [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]
      }
    }
  }
};
module.exports = initialState;
