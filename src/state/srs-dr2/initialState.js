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
  subfolderName: "dr2",
  backgroundStyle:
    "background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
  logo: "SRS.png",
  theme: "dark",
  siteTitlePrefix: "SRS DR2.0",
  hideStageTimesUntilEventEnd: false,
  teamOverride: {},
  historicalSeasonLinks: [],
  divisions: {
    srsdr2: {
      divisionName: "srsdr2",
      displayName: "SRS DR2.0",
      disableSameCarValidation: true,
      clubs: [
        {
          clubId: "485138",
          championshipIds: ["934807"],
          includeNextChampionships: true
        }
      ],
      cars: [
        "Ford Fiesta R5",
        "ŠKODA Fabia R5",
        "Mitsubishi Space Star R5",
        "Citroën C3 R5",
        "Volkswagen Polo GTI R5",
        "Peugeot 208 T16 R5"
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
