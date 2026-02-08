const copydir = require("copy-dir");
const { spawnSync, spawn } = require("child_process");

(async () => {
  try {
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

    const linuxFile = `${outputPath}/website/index.html`;

    // Convert to Windows path for explorer.exe
    const conv = spawnSync("wslpath", ["-w", linuxFile], { encoding: "utf8" });
    const winFile = conv.stdout.trim();

    console.log("Opening:", winFile);

    spawn("explorer.exe", [winFile], {
      stdio: "ignore",
      detached: true,
    }).unref();
  } catch (err) {
    console.error(err);
    process.exit(1);
  } finally {
    delete process.env.CLUB;
    delete process.env.USE_RBR_FIXTURE_CACHE;
  }
})();
