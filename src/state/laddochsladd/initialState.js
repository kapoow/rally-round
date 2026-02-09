const initialState = {
  pointsForDNF: false,
  useStandingsForHome: false,
  showCarPerformance: false,
  showLivePoints: true,
  showLivePointsDaysRemaining: 9,  
  disableTeams: true,
  hideCarColumnInStandings: true,
  showCarNameAsTextInResults: true,
  nullTeamIsPrivateer: true,
  showTeamNameTextColumn: false,
  hideTeamLogoColumn: true,
  disableOverall: false,
  teamPointsForPowerstage: false,
  backgroundStyle:
    "background-image: linear-gradient(315deg, #ffffff 0%, #d7e1ec 74%); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
  logo: "OOR.png",
  siteTitlePrefix: "Ladd och Sladd",
  hideStageTimesUntilEventEnd: true,
  teamOverride: {},
  historicalSeasonLinks: [],
  divisions: {
    all: {
      divisionName: "all",
      displayName: "All Drivers",
      disableSameCarValidation: true,
      clubs: [
        {
          clubId: "414795",
          championshipIds: ["930259"],
          includeNextChampionships: true
        }
      ],
      manualResults: [],
      points: {
        powerStage: [5, 4, 3, 2, 1],
        overall: [30, 24, 19, 15, 12, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
      }
    }
  }
};
module.exports = initialState;
