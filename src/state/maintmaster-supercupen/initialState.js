const initialState = {
  nullTeamIsPrivateer: true,
  pointsForDNF: false,
  websiteName: "Supercupen",
  //subfolderName: "supercupen",
  logo: "maintmaster.png",
  siteTitlePrefix: "Supercupen",
  useStandingsForHome: false,
  useResultsForHome: true,
  showLivePoints: true,
  showLivePointsDaysRemaining: 4,
  showCarNameAsTextInResults: false,
  hideCarColumnInStandings: false,
  useCarAsTeam: false,
  useNationalityAsTeam: false,
  showTeamNameTextColumn: true,
  hideTeamLogoColumn: true,
  numPointsForDebutant: 5,
 // disableOverall: true,
  teamPointsForPowerstage: true,
  // dropLowestScoringRoundsNumber: 1,
  //incorrectCarTimePenaltySeconds: 120,
  backgroundStyle:
    "background-image: linear-gradient(#00b1b1, #39d7d7); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
  divisions: {
    a: {
      divisionName: "A",
      displayName: "A",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 2,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "386922",
          championshipIds: ["673632",],
          includeNextChampionships: true
        },
        {
          clubId: "414212",
          championshipIds: ["673633",],
          includeNextChampionships: true
        },
      ],
      events: [],
      manualResults: [
      ],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,24,23,21,19,17,15,13,12,11,10,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      }
    },
    b: {
      divisionName: "B",
      displayName: "B",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 2,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "386922",
          championshipIds: ["673632",],
          includeNextChampionships: true
        },
        {
          clubId: "414212",
          championshipIds: ["673633",],
          includeNextChampionships: true
        },
      ],
      events: [],
      manualResults: [
      ],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,24,23,21,19,17,15,13,12,11,10,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      }
    },   
    c: {
      divisionName: "C",
      displayName: "C",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 2,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "386922",
          championshipIds: ["673632",],
          includeNextChampionships: true
        },
        {
          clubId: "414212",
          championshipIds: ["673633",],
          includeNextChampionships: true
        },
      ],
      events: [],
      manualResults: [
      ],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,24,23,21,19,17,15,13,12,11,10,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      },
    },
  }
};

module.exports = initialState;
