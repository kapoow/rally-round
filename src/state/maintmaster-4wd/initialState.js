const initialState = {
  nullTeamIsPrivateer: true,
  pointsForDNF: false,
  websiteName: "MaintMaster",
  subfolderName: "4wd",
  logo: "maintmaster.png",
  siteTitlePrefix: "MaintMaster 4WD",
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
      maxDriversScoringPointsForTeam: 2,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "437959",
          championshipIds: ["723653"],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      },
      cars: ["Ford Fiesta R5","ŠKODA Fabia R5","Mitsubishi Space Star R5","Citroën C3 R5","Volkswagen Polo GTI R5","Peugeot 208 T16 R5"]
    },
    b: {
      divisionName: "B",
      displayName: "B",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 2,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "437959",
          championshipIds: ["723653"],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      },
      cars: ["Ford Fiesta R5","ŠKODA Fabia R5","Mitsubishi Space Star R5","Citroën C3 R5","Volkswagen Polo GTI R5","Peugeot 208 T16 R5"]
    },
    c: {
      divisionName: "C",
      displayName: "C",
      disableSameCarValidation: true,
      maxDriversScoringPointsForTeam: 2,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "437959",
          championshipIds: ["723653"],
          includeNextChampionships: true
        }
      ],
      events: [],
      manualResults: [],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [50,44,41,38,35,32,30,28,26,24,22,20,18,17,16,15,14,13,12,11,10,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      },
      cars: ["Ford Fiesta R5","ŠKODA Fabia R5","Mitsubishi Space Star R5","Citroën C3 R5","Volkswagen Polo GTI R5","Peugeot 208 T16 R5"]
    },
  }
};

module.exports = initialState;