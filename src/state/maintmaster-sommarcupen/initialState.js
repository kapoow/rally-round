const initialState = {
  nullTeamIsPrivateer: false,
  pointsForDNF: false,
  websiteName: "MaintMaster",
  subfolderName: "Sommarcupen",
  logo: "maintmaster.png",
  siteTitlePrefix: "Sommarcupen",
  useStandingsForHome: false,
  useResultsForHome: true,
  showLivePoints: true,
  showLivePointsDaysRemaining: 8,
  showCarNameAsTextInResults: false,
  showCarNameAsTextInStandings: false,
  hideCarColumnInStandings: false,
  useCarAsTeam: false,
  useNationalityAsTeam: false,
  showTeamNameTextColumn: false,
  hideTeamLogoColumn: true,
  numPointsForDebutant: 5,
  disableOverall: true,
  teamPointsForPowerstage: false,
  // dropLowestScoringRoundsNumber: 1,
  // incorrectCarTimePenaltySeconds: 120,
  backgroundStyle:
    "background-image: linear-gradient(#008E8E, #21A1A1); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
  historicalSeasonLinks: [  
  ],
  divisions: {
    Sommarcupen: {
      divisionName: "Total",
      displayName: "Total",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 0,
      filterEntries: {},
      clubs: [
        {
          clubId: "419534",
          championshipIds: ["753902"],
          includeNextChampionships: true,
        }
      ],
      events: [],
      manualResults: [],
      points: {
        overall: [
          50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5
        ]
      },
    }
  }
};

module.exports = initialState;
