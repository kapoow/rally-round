const initialState = {
  pointsForDNF: false,
  websiteName: "msrd-rbr-results",
  useStandingsForHome: true,
  // subfolderName: "rbr",
  showLivePoints: true,
  showLivePointsDaysRemaining: 4,
  // noSuperRallyPointsMultiplier: 2,
  // dropLowestScoringRoundsNumber: 2,
  // afterDropRoundMessage:
  //   "*After Dropped Rounds: total points after 2 lowest scoring rounds removed - endurance rounds count as 2",
  // sortByDropRoundPoints: true,
  showSuperRallyColumn: true,
  hideCarColumnInStandings: true,
  showCarNameAsTextInResults: true,
  // nullTeamIsPrivateer: true,
  useCarAsTeam: false,
  // useCarClassAsTeam: true,
  showTeamNameTextColumn: true,
  hideTeamLogoColumn: true,
  disableOverall: true,
  teamPointsForPowerstage: false,
  backgroundStyle:
   "background-image: linear-gradient(#00b1b1, #39d7d7); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
  logo: "maintmaster.png",
  siteTitlePrefix: "MSRD RBR",
  hideStageTimesUntilEventEnd: true,
  teamOverride: {},
  historicalSeasonLinks: [
  ],
  divisions: {
    msrdRBR: {
      divisionName: "msrdRBR",
      displayName: "MSRD RBR",
      disableSameCarValidation: true,
      // enableSameCarClassValidation: true,
      maxDriversScoringPointsForTeam: 2,
      //filterEntries: { matchDivision: true },
      rbr: {
        rallies: [
          {
            eventId: 48816,
            endTime: "2022-11-13 23:59",
            locationName: "EMK Kannan",
            locationFlag: "SE",
            numStages: 6
            // enduranceRoundMultiplier: 2
          },
          {
            eventId: 48857,
            endTime: "2022-11-13 23:59",
            locationName: "Novemberskolden 2022",
            locationFlag: "SE",
            numStages: 5
            // enduranceRoundMultiplier: 2
          },
          {
            eventId: 49842,
            endTime: "2022-12-08 23:59",
            locationName: "Järlesprinten 2022",
            locationFlag: "SE",
            numStages: 11
            // enduranceRoundMultiplier: 2
          }
        ]
      },
      manualResults: [],
      events: [],
      points: {
        powerStage: [],
        overall: [20, 17, 14, 12, 10, 8, 6, 4, 2, 1]
        // stage: [1]
      }
      // cars: ["Peugeot 205 GTI"]
      // outputSheetId: "1C3fU9y1236wFmPuKcui4CEXBuSsUANH6OJ0BpQIasTc"
    },
  }
};
module.exports = initialState;
