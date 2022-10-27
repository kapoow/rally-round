const {
  teamId,
  name,
  car,
  division,
  raceNetName,
  name3
} = require("../constants/driverFieldNames");

const driverColumns = {
  [teamId]: "Team",
  [name]: "Name",
  [raceNetName]: "RacenetId",
  [division]: "Class",
  [car]: "Car",
  [name3]: "ConsoleId"
};

module.exports = { driverColumns };