const initialState = {
  nullTeamIsPrivateer: true,
  pointsForDNF: false,
  websiteName: "MaintMaster",
  subfolderName: "s8",
  logo: "maintmaster.png",
  siteTitlePrefix: "MaintMaster s8",
  useStandingsForHome: false,
  useResultsForHome: true,
  showLivePoints: true,
  showLivePointsDaysRemaining: 4,
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
      name: "MaintMaster s7 4wd",
      href: "/season7-4wd"
    },
    {
      name: "MaintMaster s7 2wd",
      href: "/season7-2wd"
    },
    {
      name: "Sommarcupen",
      href: "/sommarcupen"
    },
    {
      name: "MaintMaster s6",
      href: "/season6"
    },
    {
      name: "Supportserien s6",
      href: "/season6/supportserien"
    },
    {
      name: "Enhetscupen s6",
      href: "/season6/enhetscupen"
    },
    {
      name: "Supercupen s6",
      href: "/season6/supercupen"
    },
    {
      name: "MaintMaster s5",
      href: "/season5"
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
          championshipIds: ["781203"],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      },
      cars: ["SUBARU Legacy RS","SUBARU Impreza 1995","Mitsubishi Lancer Evolution VI","Ford Escort RS Cosworth"]
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
          championshipIds: ["781203"],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      },
      cars: ["SUBARU Legacy RS","SUBARU Impreza 1995","Mitsubishi Lancer Evolution VI","Ford Escort RS Cosworth"]
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
          championshipIds: ["781203"],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      },
      cars: ["SUBARU Legacy RS","SUBARU Impreza 1995","Mitsubishi Lancer Evolution VI","Ford Escort RS Cosworth"]
    },
  }
};

module.exports = initialState;