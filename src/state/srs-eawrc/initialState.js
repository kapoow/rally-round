const initialState = {
  pointsForDNF: false,
  useStandingsForHome: true,
  showCarPerformance: false,
  showLivePoints: true,
  showLivePointsDaysRemaining: 9,
  disableTeams: true,
  hideCarColumnInStandings: true,
  showCarNameAsTextInResults: true,
  nullTeamIsPrivateer: true,
  showTeamNameTextColumn: false,
  hideTeamLogoColumn: true,
  disableOverall: true,
  teamPointsForPowerstage: false,
  websiteName: "srs-resultat",
  subfolderName: "eawrc",
  backgroundStyle:
    "background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
  logo: "SRS.png",
  theme: "dark",
  siteTitlePrefix: "SRS EAWRC",
  hideStageTimesUntilEventEnd: true,
  teamOverride: {},
  historicalSeasonLinks: [],
  divisions: {
    Total: {
      divisionName: "srs-eawrc",
      displayName: "SRS EAWRC",
      disableSameCarValidation: true,
      wrc: [
        {
          clubId: "19871",
          championshipIds: ["57PcF7eysTrezbn4p"],
          includeNextChampionships: true
        }
      ],
      manualResults: [],
      points: {
        powerStage: [5, 4, 3, 2, 1],
        overall: [
          25, 21, 18, 16, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 5, 5, 5, 5, 5, 5,
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ]
      }
    }
  }
};
module.exports = initialState;
