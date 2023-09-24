const initialState = {
  nullTeamIsPrivateer: false,
  pointsForDNF: false,
  websiteName: "Maintmaster - Riksmästerskap",
  subfolderName: "",
  logo: "maintmaster.png",
  siteTitlePrefix: "Maintmaster - Riksmästerskap",
  useStandingsForHome: true,
  useResultsForHome: false,
  showLivePoints: true,
  showLivePointsDaysRemaining: 8,
  showCarNameAsTextInResults: true,
  showCarNameAsTextInStandings: true,
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
    /*{
      name: "Castrol teams S1",
      href: "/km-castrol-teams"
    }*/
  ],
  divisions: {
    int4wd: {
      divisionName: "int4wd",
      displayName: "International 4WD (R5)",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 0,
      filterEntries: {
        matchDivision: true
      },
      //appendEventIndexesToPrevious: [1],
      clubs: [
        {
          clubId: "444856",
          championshipIds: ["747749"],
          includeNextChampionships: true,
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
      events: [],
      manualResults: [],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [
          50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5
        ]
      }
    },
    int2wd: {
      divisionName: "int2wd",
      displayName: "International 2WD (R2)",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 0,
      filterEntries: {
        matchDivision: true
      },
      //appendEventIndexesToPrevious: [1],
      clubs: [
        {
          clubId: "444857",
          championshipIds: ["747751"],
          includeNextChampionships: true,
        },
      ],
      events: [],
      manualResults: [],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [
          50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5
        ]
      }
    },
    nat4wd: {
      divisionName: "nat4wd",
      displayName: "National 4WD (Group A)",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 0,
      filterEntries: {
        matchDivision: true
      },
      //appendEventIndexesToPrevious: [1],
      clubs: [
        {
          clubId: "444855",
          championshipIds: ["747750"],
          includeNextChampionships: true,
        }
      ],
      events: [],
      manualResults: [],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [
          50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5
        ]
      }
    },
    nat2wd: {
      divisionName: "nat2wd",
      displayName: "National 2WD (H3)",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 0,
      filterEntries: {
        matchDivision: true
      },
      //appendEventIndexesToPrevious: [1],
      clubs: [
        {
          clubId: "444858",
          championshipIds: ["747752"],
          includeNextChampionships: true,
        }
      ],
      events: [],
      manualResults: [],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [
          50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5
        ]
      }
    },
    RM2023Overall: {
      divisionName: "RM2023Overall",
      displayName: "Total",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 0,
      filterEntries: {
        matchDivision: false
      },
      //appendEventIndexesToPrevious: [1],
      clubs: [
        {
          clubId: "444858",
          championshipIds: ["747752"],
          includeNextChampionships: true,
        },
        {
          clubId: "444855",
          championshipIds: ["747750"],
          includeNextChampionships: true,
        },
        {
          clubId: "444857",
          championshipIds: ["747751"],
          includeNextChampionships: true,
        },
        {
          clubId: "444856",
          championshipIds: ["747749"],
          includeNextChampionships: true,
        }
      ],
      events: [],
      manualResults: [],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [
          50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5
        ]
      }
    }
  }
};

module.exports = initialState;
