const initialState = {
  nullTeamIsPrivateer: true,
  pointsForDNF: false,
  websiteName: "MaintMaster",
  subfolderName: "supportserien",
  logo: "maintmaster.png",
  siteTitlePrefix: "Supportserien",
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
          clubId: "413998",
          championshipIds: ["676186",],
          includeNextChampionships: true
        },
        {
          clubId: "387461",
          championshipIds: ["676187",],
          includeNextChampionships: true
        },
      ],
      events: [],
      manualResults: [
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
          clubId: "413998",
          championshipIds: ["676186",],
          includeNextChampionships: true
        },
        {
          clubId: "387461",
          championshipIds: ["676187",],
          includeNextChampionships: true
        },
      ],
      events: [],
      manualResults: [
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
          clubId: "413998",
          championshipIds: ["676186",],
          includeNextChampionships: true
        },
        {
          clubId: "387461",
          championshipIds: ["676187",],
          includeNextChampionships: true
        },
      ],
      events: [],
      manualResults: [
      ],
      points: {
        powerStage: [5,4,3,2,1],
        overall: [30,27,25,24,23,21,19,17,15,13,11,9,8,7,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]
      },
    },
  }
};

module.exports = initialState;
