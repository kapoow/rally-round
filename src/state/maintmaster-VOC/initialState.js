const initialState = {
  nullTeamIsPrivateer: true,
  pointsForDNF: false,
  websiteName: "MaintMaster",
  subfolderName: "VOC",
  logo: "maintmaster.png",
  siteTitlePrefix: "VOC",
  useStandingsForHome: false,
  useResultsForHome: true,
  showLivePoints: true,
  showLivePointsDaysRemaining: 8,
  showCarNameAsTextInResults: false,
  hideCarColumnInStandings: false,
  useCarAsTeam: false,
  useNationalityAsTeam: false,
  showTeamNameTextColumn: false,
  hideTeamLogoColumn: false,
  numPointsForDebutant: 5,
 // disableOverall: true,
  teamPointsForPowerstage: true,
  // dropLowestScoringRoundsNumber: 1,
  //incorrectCarTimePenaltySeconds: 120,
  backgroundStyle:
    "background-image: linear-gradient(#00b1b1, #39d7d7); background-size: cover; background-repeat: no-repeat; background-attachment: fixed;",
  historicalSeasonLinks: [
    {
      name: "MaintMaster s5",
      href: "/season5"
    },
    {
    name: "Supportserien s5",
    href: "/season5/supportserien"
    },
    {
      name: "Enhetscupen s5",
      href: "/season5/enhetscupen"
    },
    {
      name: "Supercupen s5",
      href: "/season5/supercupen"
    }
  ],   
  divisions: {
    VOC: {
      divisionName: "VOC",
      displayName: "VOC",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 3,
      filterEntries: {
        matchDivision: false,
      },
      clubs: [
        {
          clubId: "444854",
          championshipIds: ["713928"],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [],
      cars: ["Fiat 131 Abarth Rally"
      ],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [
          50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5
        ]
      }
    },
  }
};

module.exports = initialState;