const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { leagueRef } = require("../../state/league");
const debug = require("debug")("tkidman:dirt2-results:github");

const runGitHubOperations = async () => {
  debug('Script starting...');

  if (!process.env.CLUB || !process.env.GITHUB_ACCESS_TOKEN) {
    console.error('Error: Environment variables CLUB or GITHUB_ACCESS_TOKEN are not set. Exiting...');
    process.exit(1);
  }

  const owner = leagueRef.league.websiteName;
  const repo = leagueRef.league.subfolderName;

  const filePath = path.resolve(__dirname, '..', '..', '..', 'hidden', 'out', process.env.CLUB, 'website');


  try {
    const headers = {
      Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    };

    // Read the content of the files
    const files = fs.readdirSync(filePath);

    // Filter out directories and keep only .html files
    const htmlFiles = files
      .filter(file => fs.statSync(path.join(filePath, file)).isFile())
      .filter(file => file.endsWith('.html'));

    // Prepare the files for GitHub API
    const filesData = htmlFiles.map(file => ({
      path: file,
      mode: '100644',
      type: 'blob',
      content: fs.readFileSync(path.join(filePath, file), 'utf-8'),
    }));

    // Get the latest commit SHA for the branch
    const branchData = await axios.get(`https://api.github.com/repos/${owner}/${repo}/branches/main`, { headers });
    const latestCommitSha = branchData.data.commit.sha;

    // Create a new tree with the changes
    const treeData = await axios.post(`https://api.github.com/repos/${owner}/${repo}/git/trees`, {
      base_tree: latestCommitSha,
      tree: filesData,
    }, { headers });

    // Create a new commit
    const commitData = await axios.post(`https://api.github.com/repos/${owner}/${repo}/git/commits`, {
      message: 'Add HTML files via script',
      tree: treeData.data.sha,
      parents: [latestCommitSha],
    }, { headers });

    // Update the branch reference to the new commit
    await axios.patch(`https://api.github.com/repos/${owner}/${repo}/git/refs/heads/main`, {
      sha: commitData.data.sha,
    }, { headers });

    debug('GitHub operations completed successfully!');
  } catch (error) {
    console.error('Error during GitHub operations:', error);
    throw error;
  }
};

module.exports = runGitHubOperations;

