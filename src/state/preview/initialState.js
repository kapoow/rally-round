// Frontend preview club.
//
// This club is never fetched or deployed. It exists so the snapshot preview
// renderer has its own CLUB - and therefore its own ./hidden/out/preview
// output directory - instead of writing into (and wiping) a real club's folder.
//
// Every value here is overridden at render time by the committed snapshot in
// src/__fixtures__/preview/leagueResults.json, which carries the real league
// config it was generated with. See scripts/preview-snapshot.js.
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
