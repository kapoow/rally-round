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
      maxDriversScoringPointsForTeam: 3,
      filterEntries: {
        matchDivision: true,
      },
      clubs: [
        {
          clubId: "437959",
          championshipIds: ["674303","679096","684128","687920","692218","698871","704164","711532"],
          includeNextChampionships: false
        }
      ],
      events: [],
      manualResults: [
        /*{
          eventIndex: 3,
          results: [
            {
              name: "Tollsson",
              totalTime: "47:45.539",
            },
          ]
        },*/
      ],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,24,23,21,19,17,15,13,11,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      }
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
          championshipIds: ["674303","679096","684128","687920","692218","698871","704164","711532"],
          includeNextChampionships: false
        }
      ],
      events: [],
      manualResults: [
        {
          eventIndex: 0,
          results: [
            {
              name: "H-D Steiner",
              isDebutant: true,
            },
          ]
        },
      ],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,24,23,21,19,17,15,13,11,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      }
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
          championshipIds: ["674303","679096","684128","687920","692218","698871","704164","711532"],
          includeNextChampionships: false
        }
      ],
      events: [],
      manualResults: [
        {
          eventIndex: 0,
          results: [
            {
              name: "Rackar Hubert",
              isDebutant: true,
            },
            {
              name: "Dalle",
              isDebutant: true,
            },
            {
              name: "Spiralfjader",
              isDebutant: true,
            },
            {
              name: "ASPLUND",
              isDebutant: true,
            },
            {
              name: "L Backlund",
              isDebutant: true,
            },
            {
              name: "Hillerstrumpa",
              isDebutant: true,
            },
          ]
        },
        {
          eventIndex: 1,
          results: [
            {
              name: "Dalle",
              isDebutant: true,
            },
            {
              name: "ASPLUND",
              isDebutant: true,
            },
            {
              name: "L Backlund",
              isDebutant: true,
            },
          ]
        },
        {
          eventIndex: 2,
          results: [
            {
              name: "TGR_Tirwyn",
              stageTime: "07:28.891",
              totalTime: "42:53.964",
            },
            {
              name: "Sledge",
              isDebutant: true,
            }
          ]
        },		
        {
          eventIndex: 4,
          results: [
            {
              name: "Berg.Liam",
              isDebutant: true,
            },
          ]
        },	
      ],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,24,23,21,19,17,15,13,11,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      }
    },
  }
};

module.exports = initialState;