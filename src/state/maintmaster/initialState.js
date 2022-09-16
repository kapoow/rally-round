const initialState = {
  nullTeamIsPrivateer: true,
  pointsForDNF: false,
  websiteName: "MaintMaster-results",
  // subfolderName: "worldcup",
  logo: "maintmaster.png",
  siteTitlePrefix: "MaintMaster",
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
      clubs: [
        {
          clubId: "414209",
          championshipIds: ["602654", "607003", "621615", "626133","630229","655547",],
          includeNextChampionships: true
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
        powerStage: [5, 4, 3, 2, 1],
        overall: [15, 13, 11, 9, 7, 6, 5, 5, 5, 5]
      }
    },
    a: {
      divisionName: "a",
      displayName: "A",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 2,
      clubs: [
        {
          clubId: "392122",
          championshipIds: ["602657","607006","621616","626135","630247","655548",],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [
        {
          eventIndex: 5,
          results: [
            {
              name: "D Gustafsson",
              stageTime: "03:32.824",
              totalTime: "27:34.682",
            },
          ]
        },
        {
          eventIndex: 4,
          results: [
            {
              name: "Weepy",
              stageTime: "06:13.885",
              totalTime: "36:47.705",
            },
          ]
        },      
        {
          eventIndex: 0,
          results: [
            {
              name: "j hjortbrandt",
              stageTime: "05:45.952",
              totalTime: "31:45.800",
            },
          ]
        },
        {
          eventIndex: 2,
          results: [
            {
              name: "Peter.Danielsson",
              stageTime: "06:34.534",
              totalTime: "28:23.500",
            },
          ]
        }
	
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
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,24,23,21,19,17,15,13,10,8,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      }
    },
    b: {
      divisionName: "b",
      displayName: "B",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 2,
      clubs: [
        {
          clubId: "392123",
          championshipIds: ["602658","607009","621617","626138","630246","655549",],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [
        {
          eventIndex: 1,
          results: [
            {
              name: "Jimpa SWE",
              totalTime: "52:11.200",
            },
          ]
        },
        {
          eventIndex: 2,
          results: [
            {
              name: "Johan.nesse",
              stageTime: "06:42.600",
              totalTime: "28:31.160",
              isDebutant: true,
              isDnfEntry: true,
            },
            {
              name: "RALLY-KALLE72",
              stageTime: "06:36.700",
              totalTime: "28:54.336",
              isDebutant: true,
              isDnfEntry: true,
            }
          ]
        },
        {
          eventIndex: 3,
          results: [
            {
              name: "RALLY-KALLE72",
              stageTime: "03:37.132",
              totalTime: "43:03.053",
              isDebutant: true,
              isDnfEntry: true,
            }
          ]
        },
        {
          eventIndex: 5,
          results: [
            {
              name: "Johan.nesse",
              stageTime: "03:41.787",
              totalTime: "28:24.367",
              isDebutant: true,
              isDnfEntry: true,
            },
          ]
        },
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
        powerStage: [5,4,3,2,1],
        //overall: [25,22,20,19,18,16,14,12,10,8,5,3,1]
        overall: [30,27,25,24,23,21,20,19,18,17,15,13,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,]
      }
    },   
    c: {
      divisionName: "c",
      displayName: "C",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 2,
      clubs: [
        {
          clubId: "392124",
          championshipIds: ["602659","607010","621618","626140","630244","655550",],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [
        {
          eventIndex: 2,
          results: [
            {
              name: "Peter.Danielsson",
              //stageTime: "15:00:00.000",
              //totalTime: "23:59:59.000",
              //stageDiff: "N/A",
              isDnfEntry: true,
              isDnsEntry: true,
            },
            {
              name: "Raybz|★|",
              stageTime: "07:02.816",
              totalTime: "30:44.300",
              isDnfEntry: true,
              isDebutant: true,
            },
            {
              name: "ERNEBRO",
              stageTime: "07:20.965",
              totalTime: "32:32.600",
              isDnfEntry: true,
              isDebutant: true,
            },
          ]
        },
        {
          eventIndex: 3,
          results: [
            {
              name: "Raybz|★|",
              stageTime: "03:37.964",
              totalTime: "46:24.366",
              isDnfEntry: true,
              isDebutant: true,
            },
            {
              name: "ERNEBRO",
              stageTime: "04:02.061",
              totalTime: "48:30.595",
              isDnfEntry: true,
              isDebutant: true,
            },
          ]
        },
        {
          eventIndex: 0,
          results: [
            {
              name: "VULCA71",
              stageTime: "05:53.000",
              totalTime: "34:22.200",
            },
          ]
        },
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
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,22,19,15,13,11,8,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      },
    }
  }
};

module.exports = initialState;