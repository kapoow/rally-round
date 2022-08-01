// eslint-disable-next-line no-unused-vars
const { JRC_CALCULATIONS } = require("../../fantasy/fantasyFormulas");
// const { privateer } = require("../../shared");

const points = {
  powerStage: [5, 4, 3, 2, 1],
  overall: [
    50,
    44,
    41,
    38,
    35,
    32,
    30,
    28,
    26,
    24,
    22,
    20,
    18,
    17,
    16,
    15,
    14,
    13,
    12,
    11,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ]
};

const initialState = {
  pointsForDNF: false,
  websiteName: "jrc-results",
  useStandingsForHome: true,
  showLivePoints: true,
  showLivePointsDaysRemaining: 4,
  nullTeamIsPrivateer: false,
  enableDnsPenalty: true,
  dnsPenaltyFromFirstRound: true,
  // showCarNameAsTextInResults: true,
  // hideCarColumnInStandings: false,
  // useCarAsTeam: false,
  // useNationalityAsTeam: true,
  // disableOverall: true,
  // teamPointsForPowerstage: false,
  dropLowestScoringRoundsNumber: 1,
  sortByDropRoundPoints: true,
  // incorrectCarTimePenaltySeconds: 120,
  backgroundStyle:
    "background-image: linear-gradient(to left, #2c3e50, #fd746c); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
  logo: "JRC.png",
  siteTitlePrefix: "JRC",
  divisions: {
    jrc1: {
      displayName: "JRC",
      divisionName: "jrc1",
      maxDriversScoringPointsForTeam: 2,
      clubs: [
        {
          clubId: "180867",
          championshipIds: ["625004"],
          includeNextChampionships: true
        }
      ],
      events: [],
      points,
      cars: [
        "Ford RS200",
        "Peugeot 205 T16 Evo 2",
        "Audi Sport quattro S1 E2",
        "MG Metro 6R4"
      ],
      // fantasy: true,
      // outputSheetId: "1P-0CJ4rm7xBaMsan0yMcFKwDIWkqjIvYWHNrjgFDixc",
      // filterEntries: {
      //   matchDivision: true
      // }, TheBac0nat0or
      manualResults: [
        {
          eventIndex: 0,
          results: [
            {
              name: "TheBac0nat0or",
              totalTime: "47:43.981",
              stageTime: "03:04.776"
            }
          ]
        },
        {
          eventIndex: 3,
          results: [
            {
              name: "TheBac0nat0or",
              totalTime: "42:28.438",
              stageTime: "03:24.594"
            }
          ]
        },
        {
          eventIndex: 4,
          results: [
            {
              name: "TheBac0nat0or",
              totalTime: "42:11.472",
              stageTime: "04:00.177"
            }
          ]
        },
        {
          eventIndex: 5,
          results: [
            {
              name: "TheBac0nat0or",
              totalTime: "40:14.217",
              stageTime: "04:27.963"
            }
          ]
        },
        {
          eventIndex: 6,
          results: [
            {
              name: "BrothersChris",
              totalTime: "43:55.828"
            }
          ]
        }
      ],
      promotionRelegation: {
        relegationZone: 7
      }
    },
    jrc2: {
      displayName: "JRC2",
      divisionName: "jrc2",
      maxDriversScoringPointsForTeam: 2,
      clubs: [
        {
          clubId: "244734",
          championshipIds: ["624974"],
          includeNextChampionships: true
        }
      ],
      events: [],
      points,
      cars: [
        "SUBARU Legacy RS",
        "SUBARU Impreza 1995",
        "Mitsubishi Lancer Evolution VI",
        "Ford Escort RS Cosworth"
      ],
      outputSheetId: "1WaBmoqfRtXO8CEGhnE2g1b93F5o2Kjh7Nx3vi13U5Tg",
      manualResults: [
        {
          eventIndex: 2,
          results: [
            {
              name: "kersna80",
              totalTime: "40:17.447"
            }
          ]
        }
      ],
      promotionRelegation: {
        promotionZone: 9,
        relegationZone: 8
      }
      // filterEntries: {
      //   matchDivision: true
      // },
    },
    jrc3: {
      displayName: "JRC3",
      divisionName: "jrc3",
      maxDriversScoringPointsForTeam: 2,
      clubs: [
        {
          clubId: "330674",
          championshipIds: ["624994"],
          includeNextChampionships: true
        }
      ],
      events: [],
      points,
      cars: [
        "Ford Focus RS Rally 2001",
        "Peugeot 206 Rally",
        "SUBARU Impreza (2001)",
        "SUBARU Impreza S4 Rally"
      ],
      manualResults: [
        {
          eventIndex: 3,
          results: [
            {
              name: "CokeCanTv",
              totalTime: "01:09:11.419",
              stageTime: "15:00.000"
            }
          ]
        }
      ],
      promotionRelegation: {
        promotionZone: 9,
        relegationZone: 9
      }
    },
    jrc4: {
      displayName: "JRC4",
      divisionName: "jrc4",
      maxDriversScoringPointsForTeam: 2,
      clubs: [
        {
          clubId: "342117",
          championshipIds: ["624997"],
          includeNextChampionships: true
        }
      ],
      events: [],
      points,
      manualResults: [],
      promotionRelegation: {
        // promotionDoubleZone: 1,
        promotionZone: 12
      },
      cars: [
        "Ford Fiesta R5",
        "ŠKODA Fabia R5",
        "Mitsubishi Space Star R5",
        "Citroën C3 R5",
        "Volkswagen Polo GTI R5",
        "Peugeot 208 T16 R5"
      ]
      // fantasy: true
    }
  }
  // fantasy: {
  //   calculators: JRC_CALCULATIONS,
  //   teams: [],
  //   driverStandings: {},
  //   sheetId: "1ifywqh1xfyVjpUqiG1zODpXupbyHwIzVsZCmOvcHtmg"
  // },
  // standingsOutputSheetId: "1iLIPjB2fsi3HI5S5CgrvnkEzrdA6fT71m_9zmtL19VI"
};

module.exports = initialState;
