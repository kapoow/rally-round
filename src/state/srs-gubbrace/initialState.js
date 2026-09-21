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
  hideCarColumnInStandings: false,
  showCarNameAsTextInResults: true,
  nullTeamIsPrivateer: true,
  showTeamNameTextColumn: false,
  hideTeamLogoColumn: true,
  disableOverall: true,
  teamPointsForPowerstage: false,
  websiteName: "srs-resultat",
  siteBasePath: "/srs-resultat",
  subfolderName: "gubbrace",
  backgroundStyle:
    "background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
  logo: "SRS.png",
  theme: "dark",
  siteTitlePrefix: "SRS GUBBRACE",
  hideStageTimesUntilEventEnd: false,
  teamOverride: {},
  historicalSeasonLinks: [],
  divisions: {
    srsgubbrace: {
      divisionName: "srsgubbrace",
      displayName: "SRS GUBBRACE",
      disableSameCarValidation: true,
      plannedRounds: 4,
      wrc: [
        {
          clubId: "19871",
          championshipIds: ["Mbn5YQ1U7Fz1AHQ4"],
          includeNextChampionships: true
        }
      ],
      manualResults: [],
      points: {
        powerStage: [],
        overall: [
          30, 25, 22, 20, 18, 16, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 5, 5, 5, 5,
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
          5, 5, 5, 5, 5, 5
        ]
      }
    }
  }
};
module.exports = initialState;
