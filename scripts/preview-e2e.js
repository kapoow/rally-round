const copydir = require("copy-dir");
const { spawnSync, spawn } = require("child_process");

// Shortcuts so frontend work can jump straight to the page being styled:
//   npm run preview                -> home
//   npm run preview standings      -> driver standings
//   npm run preview results        -> event results
//   npm run preview teams          -> team standings
//   npm run preview overall        -> overall pseudo-division standings
//   npm run preview <filename>     -> any generated page
//   npm run preview -- --no-open   -> generate only, don't launch a browser
const pageShortcuts = {
  home: "index.html",
  standings: "test-e2e-driver-standings.html",
  results: "test-e2e-0-driver-results.html",
  teams: "test-e2e-team-standings.html",
  overall: "overall-driver-standings.html",
  error: "error.html"
};

(async () => {
  try {
    const args = process.argv.slice(2);
    const noOpen = args.includes("--no-open");
    const target = args.find(arg => !arg.startsWith("--")) || "home";

    process.env.CLUB = "test-e2e";
    process.env.KEEP_LOCAL_CACHE = "true";
    // Use fixture cache for active events so 47618 uses local CSV instead of live API
    process.env.USE_RBR_FIXTURE_CACHE = "true";

    const { processAllDivisions } = require("../src/index");
    const { checkOutputDirs } = require("../src/output/output");
    const { cachePath, outputPath } = require("../src/shared");

    checkOutputDirs();
    copydir.sync("./src/__fixtures__/e2e", `${cachePath}`);

    await processAllDivisions();

    const websitePath = `${outputPath}/website`;
    console.log(`Generated pages in: ${websitePath}`);

    if (noOpen) {
      return;
    }

    const page = pageShortcuts[target] || target;
    const linuxFile = `${websitePath}/${page}`;

    // Convert to Windows path for explorer.exe
    const conv = spawnSync("wslpath", ["-w", linuxFile], { encoding: "utf8" });
    const winFile = conv.stdout.trim();

    console.log("Opening:", winFile);

    spawn("explorer.exe", [winFile], {
      stdio: "ignore",
      detached: true
    }).unref();
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    delete process.env.CLUB;
    delete process.env.USE_RBR_FIXTURE_CACHE;
  }
})();
