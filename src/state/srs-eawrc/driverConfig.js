const {
  name,
  car,
  raceNetName,
  name3
} = require("../constants/driverFieldNames");

const driverColumns = {
  [name]: "Name",
  [raceNetName]: "RacenetId",
  [car]: "Car",
  [name3]: "ConsoleId"
};

module.exports = { driverColumns };
