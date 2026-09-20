/**
 * Live preview server for frontend work.
 *
 *   npm run preview:serve                    -> snapshot: full 9-event season
 *   npm run preview:serve standings          -> opens the standings page
 *   npm run preview:serve --e2e              -> the e2e club (runs processing)
 *   LOCALE=se npm run preview:serve          -> render in Swedish
 *   PORT=5000 npm run preview:serve          -> different port
 *
 * Two data sources:
 *   snapshot (default) - renders a committed full championship straight from
 *     src/__fixtures__/preview/leagueResults.json. 9 events (8 finished, 1
 *     active), 39 drivers, real DNF/DNS rows. Skips fetch and processing, so
 *     it is fast and is the right fixture for wide-table design work.
 *   --e2e - runs the real pipeline over the e2e fixtures. Fewer events, but
 *     exercises processing, so use it when changing src/index.js.
 *
 * Serves over http, watches src/ and assets/, regenerates on change and pushes
 * a browser reload over SSE. Zero extra deps.
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const { spawn, spawnSync } = require("child_process");

const args = process.argv.slice(2);
const useE2E = args.includes("--e2e");

process.env.CLUB = useE2E ? "test-e2e" : "preview";
const { outputPath } = require("../src/shared");

const websiteRoot = path.resolve(`${outputPath}/website`);
const projectRoot = path.resolve(__dirname, "..");
const watchDirs = ["src", "assets"].map(dir => path.join(projectRoot, dir));

const builderScript = useE2E ? "preview-e2e.js" : "preview-snapshot.js";
const builderArgs = useE2E ? ["--no-open"] : [];

const pageShortcuts = useE2E
  ? {
      home: "index.html",
      standings: "test-e2e-driver-standings.html",
      results: "test-e2e-0-driver-results.html",
      teams: "test-e2e-team-standings.html",
      overall: "overall-driver-standings.html",
      error: "error.html"
    }
  : {
      home: "index.html",
      standings: "srssommarcupen-driver-standings.html",
      // Round 8 of 9: the last finished event, matching the results mockup.
      results: "srssommarcupen-7-driver-results.html",
      // Round 9: the active event, for live/in-progress styling.
      active: "srssommarcupen-8-driver-results.html",
      error: "error.html"
    };

const target = args.find(arg => !arg.startsWith("--")) || "home";
const startPage = pageShortcuts[target] || target;
const basePort = Number(process.env.PORT) || 4173;
// Listen beyond WSL's loopback interface so Windows can forward this port to
// other devices on the LAN (for example, a physical phone via portproxy).
const previewHost = process.env.HOST || "0.0.0.0";

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".csv": "text/csv; charset=utf-8"
};

// Injected into every html response so the page reconnects and reloads itself.
const reloadSnippet = `
<script>
  (function () {
    var source = new EventSource("/__preview-reload");
    source.onmessage = function (event) {
      if (event.data === "reload") window.location.reload();
    };
    source.onerror = function () {
      // Server restarted or died - keep trying, reload once it answers again.
      setTimeout(function () { window.location.reload(); }, 1500);
    };
  })();
</script>
`;

let clients = [];
let building = false;
let queued = false;

const build = () => {
  if (building) {
    queued = true;
    return;
  }
  building = true;

  const started = Date.now();
  const child = spawn(
    process.execPath,
    [path.join(__dirname, builderScript), ...builderArgs],
    { cwd: projectRoot, stdio: ["ignore", "pipe", "pipe"] }
  );

  let stderr = "";
  child.stderr.on("data", chunk => {
    stderr += chunk;
  });
  child.stdout.resume();

  child.on("close", code => {
    building = false;

    if (code === 0) {
      console.log(`rebuilt in ${Date.now() - started}ms - reloading browser`);
    } else {
      console.error(`build failed (exit ${code})`);
      console.error(stderr.trim().split("\n").slice(-15).join("\n"));
    }

    // Reload either way: a failed build usually still leaves the last good
    // pages in place, and the error output is on the terminal.
    clients.forEach(res => res.write("data: reload\n\n"));

    if (queued) {
      queued = false;
      build();
    }
  });
};

let debounceTimer = null;
const scheduleBuild = () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(build, 250);
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/__preview-reload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive"
    });
    res.write("retry: 1000\n\n");
    clients.push(res);
    req.on("close", () => {
      clients = clients.filter(client => client !== res);
    });
    return;
  }

  const requested = decodeURIComponent(url.pathname);
  const relative = requested === "/" ? "/index.html" : requested;
  const filePath = path.join(websiteRoot, relative);

  // Never serve outside the generated website directory.
  if (!filePath.startsWith(websiteRoot)) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        `<h1>404</h1><p>${relative} not found.</p><p>Generated pages:</p><pre>${fs
          .readdirSync(websiteRoot)
          .filter(name => name.endsWith(".html"))
          .map(name => `<a href="/${name}">${name}</a>`)
          .join("\n")}</pre>${reloadSnippet}`
      );
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || "application/octet-stream";

    if (ext === ".html") {
      const body = data
        .toString()
        .replace(/<\/body>/i, `${reloadSnippet}</body>`);
      res.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": "no-store"
      });
      res.end(body);
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": "no-store"
    });
    res.end(data);
  });
});

const listen = port => {
  server.once("error", err => {
    if (err.code === "EADDRINUSE" && port < basePort + 10) {
      listen(port + 1);
      return;
    }
    throw err;
  });

  server.listen(port, previewHost, () => {
    const url = `http://localhost:${port}/${startPage}`;
    console.log(`\npreview server running: ${url}`);
    console.log(`listening on: ${previewHost}:${port}`);
    console.log(
      `data: ${useE2E ? "e2e fixtures (full pipeline)" : "snapshot (9 events, 1 active)"}`
    );
    console.log(
      `watching: src/ assets/  (edits rebuild and reload the page)\n`
    );

    if (args.includes("--no-open")) return;

    // WSL: hand the url to the Windows default browser.
    const opener = spawnSync("which", ["wslview"], { encoding: "utf8" });
    if (opener.status === 0) {
      spawn("wslview", [url], { stdio: "ignore", detached: true }).unref();
    } else {
      spawn("explorer.exe", [url], { stdio: "ignore", detached: true }).unref();
    }
  });
};

(async () => {
  console.log("building initial preview...");
  build();

  watchDirs.forEach(dir => {
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
      if (!filename) return;
      if (/\.(js|hbs|css|json|png|jpg|svg)$/i.test(filename)) scheduleBuild();
    });
  });

  listen(basePort);
})();
