const {
  teamId,
  name,
  //car,
  division,
  raceNetName,
  name3
} = require("../constants/driverFieldNames");

const driverColumns = {
  [teamId]: "Team",
  [name]: "Username/Gamertag",
  [raceNetName]: "Racenet Display Name",
  [division]: "Class",
  //[car]: "Car",
  [name3]: "Name3"
};

module.exports = { driverColumns };