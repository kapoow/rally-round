process.env.DEBUG = "tkidman:*";
if (process.argv[2] && process.argv[3]) {
  process.env.DIRT_USERNAME = process.argv[2];
  process.env.DIRT_PASSWORD = process.argv[3];
}

const { fetchClubs } = require("./src/dirtAPI");
const { updateClubsSheet } = require("./src/sheetsAPI/sheets");

const scrapeClubs = async () => {
  const clubs = await fetchClubs();
  await updateClubsSheet(clubs);
};

scrapeClubs();
