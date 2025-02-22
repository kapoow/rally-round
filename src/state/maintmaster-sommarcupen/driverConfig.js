const {
  name,
  car,
  division,
  raceNetName,
  name3
} = require("../constants/driverFieldNames");

const driverColumns = {
  [name]: "Name",
  [raceNetName]: "RacenetId",
  [division]: "Class",
  [car]: "Car",
  [name3]: "ConsoleId"
};

const sheetsConfig = {
  sheetId: "1XWkV05uHHCc-YSVTTQ0sTa62lnXMe76lvXB0ChiwpJ0",
  tabName: "All tiers",
  manualResultsTabName: "Sommarcupen RM"
};

module.exports = { driverColumns, sheetsConfig };
