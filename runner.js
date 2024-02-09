process.env.DEBUG = "tkidman:*";
if (process.argv.length < 3) {
  require("dotenv").config();
}
if (process.argv[2] && process.argv[3]) {
  process.env.DIRT_USERNAME = process.argv[2];
  process.env.DIRT_PASSWORD = process.argv[3];
}

if (process.argv[4]) {
  process.env.CLUB = process.argv[4];
}
const { processAllDivisions } = require("./src");
const runGitHubOperations = require('./src/api/github/github');
const debug = require("debug")("tkidman:dirt2-results:state");


debug('Starting processAllDivisions...');

processAllDivisions()
  .then(() => {
    debug('processAllDivisions completed. Proceeding with GitHub operations...');
    return runGitHubOperations();
  })
  .then(() => {
    debug('GitHub operations completed. Script completed.');
  })
  .catch((error) => {
    debug('Error in the main script:', error);
    throw error;
  });
  