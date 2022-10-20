const initialState = {
  nullTeamIsPrivateer: true,
  pointsForDNF: false,
  websiteName: "MaintMaster",
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
    a: {
      divisionName: "A",
      displayName: "A",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 3,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "437959",
          championshipIds: ["674303"],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [	
      ],
      cars: [
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
      maxDriversScoringPointsForTeam: 3,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "437959",
          championshipIds: ["674303"],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [	
      ],
      cars: [
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
      maxDriversScoringPointsForTeam: 3,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "437959",
          championshipIds: ["674303"],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [	
      ],
      cars: [
      ],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,24,23,21,19,17,15,13,12,11,10,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      }
    },
  }
};

module.exports = initialState;