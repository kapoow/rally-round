const initialState = {
  pointsForDNF: false,
  websiteName: "jrc-results",
  subfolderName: "wrc",
  showLivePoints: true,
  showLivePointsDaysRemaining: 3,
  hideCarColumnInStandings: true,
  showCarNameAsTextInResults: true,
  nullTeamIsPrivateer: true,
  // useCarAsTeam: false,
  // useCarClassAsTeam: true,
  disableOverall: true,
  teamPointsForPowerstage: true,
  backgroundStyle:
    "background-image: linear-gradient(315deg, #eec0c6 0%, #7ee8fa 74%); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
  logo: "JRC.png",
  siteTitlePrefix: "JRC WRC",
  divisions: {
    jrcWrc: {
      divisionName: "wrcSeason4",
      displayName: "WRC Season 4",
      disableSameCarValidation: false,
      // enableSameCarClassValidation: true,
      maxDriversScoringPointsForTeam: 2,
      // filterEntries: true,
      manual: {
        sheetId: "1XLdvxPe9bCZybKWb9nPTCn7kItN-7Xfwtt9LF_KLLNw"
      },
      manualResults: [],
      events: [],
      points: {
        powerStage: [5, 4, 3, 2, 1],
        overall: [
          35,
          29,
          26,
          23,
          20,
          18,
          16,
          14,
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
          1
        ]
        // stage: [1]
      }
      // cars: ["Peugeot 205 GTI"]
      // outputSheetId: "1C3fU9y1236wFmPuKcui4CEXBuSsUANH6OJ0BpQIasTc"
    }
  }
};
module.exports = initialState;
