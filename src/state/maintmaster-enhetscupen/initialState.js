const initialState = {
  nullTeamIsPrivateer: true,
  pointsForDNF: false,
  websiteName: "MaintMaster-Enhetscupen-results",
  subfolderName: "enhetscupen",
  logo: "maintmaster.png",
  siteTitlePrefix: "Enhetscupen",
  useStandingsForHome: true,
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
    elit: {
      divisionName: "elit",
      displayName: "Elit",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 1,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "380076",
          championshipIds: ["602665",],
          includeNextChampionships: true
        },
    ],
    events: [],

      cars: [
        "SUBARU WRX STI NR4"
      ],
      points: {
        powerStage: [5, 4, 3, 2, 1],
        overall: [15, 13, 11, 9, 7, 6, 5, 5, 5, 5]
      }
    },
    a: {
      divisionName: "a",
      displayName: "A",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 2,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "380076",
          championshipIds: ["602665",],
          includeNextChampionships: true
        },
      ],
      events: [],
      manualResults: [
      ],
      cars: [
        "SUBARU WRX STI NR4"
      ],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,24,23,21,19,17,15,13,10,8,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      }
    },
    b: {
      divisionName: "b",
      displayName: "B",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 2,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "380076",
          championshipIds: ["602665",],
          includeNextChampionships: true
        },
      ],
      events: [],
      manualResults: [
      ],
      cars: [
        "SUBARU WRX STI NR4"
      ],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,24,23,21,20,19,18,17,15,13,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,]
      }
    },   
    c: {
      divisionName: "c",
      displayName: "C",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 2,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "380076",
          championshipIds: ["602665",],
          includeNextChampionships: true
        },
      ],
      events: [],
      manualResults: [
      ],
      cars: [
        "SUBARU WRX STI NR4"
      ],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,22,19,15,13,11,8,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      },
    },
    open: {
      divisionName: "open",
      displayName: "Open",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 2,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "380076",
          championshipIds: ["602665",],
          includeNextChampionships: true
        },
      ],
      events: [],
      manualResults: [
      ],
      cars: [
        "SUBARU WRX STI NR4"
      ],
      points: {
        powerStage: [5, 4, 3, 2, 1],
        overall: [15, 13, 11, 9, 7, 6, 5, 5, 5, 5]
      },
    },
  }
};

module.exports = initialState;