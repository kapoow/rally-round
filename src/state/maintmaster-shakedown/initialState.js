const initialState = {
  nullTeamIsPrivateer: true,
  pointsForDNF: false,
  websiteName: "MaintMaster-shakedown",
  subfolderName: "Shakedown",
  logo: "maintmaster.png",
  siteTitlePrefix: "Shakedown",
  useStandingsForHome: true,
  showLivePoints: false,
  showLivePointsDaysRemaining: 4,
  showCarNameAsTextInResults: false,
  hideCarColumnInStandings: false,
  useCarAsTeam: false,
  useNationalityAsTeam: false,
  showTeamNameTextColumn: true,
  hideTeamLogoColumn: true,
  numPointsForDebutant: 5,
disableTeams: true,
 // disableOverall: true,
//teamPointsForPowerstage: false,
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
          clubId: "393369",
          championshipIds: ["663000"],
        }
    ],
    events: [],

      cars: [
        "Peugeot 206 Rally",
        "Ford Focus RS Rally 2001",
        "SUBARU Impreza (2001)",
        "ŠKODA Fabia Rally",
        "SUBARU Impreza S4 Rally",
        "SUBARU Impreza",
        "Citroën C4 Rally",
        "Ford Focus RS Rally 2007",
      ],
      points: {
       // powerStage: [5, 4, 3, 2, 1],
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
          clubId: "393369",
          championshipIds: ["663000"],
        }
      ],
      events: [],
      manualResults: [
      ],
      cars: [
        "Peugeot 206 Rally",
        "Ford Focus RS Rally 2001",
        "SUBARU Impreza (2001)",
        "ŠKODA Fabia Rally",
        "SUBARU Impreza S4 Rally",
        "SUBARU Impreza",
        "Citroën C4 Rally",
        "Ford Focus RS Rally 2007",
      ],
      points: {
        //powerStage: [5,4,3,2,1],
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
          clubId: "393369",
          championshipIds: ["663000"],
        }
      ],
      events: [],
      manualResults: [
      ],
      cars: [
        "Peugeot 206 Rally",
        "Ford Focus RS Rally 2001",
        "SUBARU Impreza (2001)",
        "ŠKODA Fabia Rally",
        "SUBARU Impreza S4 Rally",
        "SUBARU Impreza",
        "Citroën C4 Rally",
        "Ford Focus RS Rally 2007",
      ],
      points: {
       // powerStage: [5,4,3,2,1],
        //overall: [25,22,20,19,18,16,14,12,10,8,5,3,1]
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
          clubId: "393369",
          championshipIds: ["663000"],
        }
      ],
      events: [],
      manualResults: [
      ],
      cars: [
        "Peugeot 206 Rally",
        "Ford Focus RS Rally 2001",
        "SUBARU Impreza (2001)",
        "ŠKODA Fabia Rally",
        "SUBARU Impreza S4 Rally",
        "SUBARU Impreza",
        "Citroën C4 Rally",
        "Ford Focus RS Rally 2007",
      ],
      points: {
       //powerStage: [5,4,3,2,1],
        overall: [30,27,25,22,19,15,13,11,8,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      },
    }
  }
};

module.exports = initialState;
