const initialState = {
  pointsForDNF: false,
  useStandingsForHome: false,
  showCarPerformance: false,
  showLivePoints: true,
  //showLivePointsDaysRemaining: 9,
  dropLowestScoringRoundsNumber: 1,
  afterDropRoundMessage:
    "*After Dropped Rounds: total points after 1 lowest scoring rounds removed",
  sortByDropRoundPoints: true,
  superRallyIsDnf: true,
  showSuperRallyColumn: true,
  disableTeams: true,
  hideCarColumnInStandings: true,
  showCarNameAsTextInResults: true,
  nullTeamIsPrivateer: true,
  showTeamNameTextColumn: false,
  hideTeamLogoColumn: true,
  disableOverall: true,
  teamPointsForPowerstage: false,
  websiteName: "srs-resultat",
  siteBasePath: "/srs-resultat",
  subfolderName: "sommarcupen",
  backgroundStyle:
    "background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
  logo: "SRS.png",
  theme: "dark",
  siteTitlePrefix: "SRS SOMMARCUPEN",
  hideStageTimesUntilEventEnd: false,
  teamOverride: {},
  historicalSeasonLinks: [],
  divisions: {
    srssommarcupen: {
      divisionName: "srssommarcupen",
      displayName: "SRS SOMMARCUPEN",
      disableSameCarValidation: true,
      wrc: [
        {
          clubId: "19871",
          championshipIds: ["5QjVUFmYQEDBCWhGy"],
          includeNextChampionships: true
        }
      ],
      manualResults: [],
      points: {
        powerStage: [5, 4, 3, 2, 1],
        overall: [
          25, 21, 18, 16, 14, 12, 10, 8, 7, 6, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
        ]
      }
    }
  }
};
module.exports = initialState;
