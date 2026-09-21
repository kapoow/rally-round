/**
 * Bounded Puppeteer helper for generated-site visual checks.
 *
 * Examples:
 *   node scripts/visual-check.js overall-7-driver-results.html
 *   node scripts/visual-check.js standings --width 390 --height 844
 *   node scripts/visual-check.js active --click ".page-heading__nav-button"
 *   node scripts/visual-check.js results --hover ".navDrop"
 *   node scripts/visual-check.js results --toggle "[aria-controls=mobileNav]"
 *   node scripts/visual-check.js results --scroll "#tableDrivers"
 *   node scripts/visual-check.js results --scroll-x 180
 *
 * Targets are restricted to the generated preview site, and screenshots are
 * written under /tmp. This keeps the persistent command approval narrow.
 */
const fs = require("fs");
const path = require("path");
const { URL } = require("url");
const puppeteer = require("puppeteer");

const args = process.argv.slice(2);
const positional = args.find(arg => !arg.startsWith("--")) || "results";
const getOption = (name, fallback) => {
  const index = args.indexOf(`--${name}`);
  return index === -1 ? fallback : args[index + 1];
};

const pageShortcuts = {
  home: "index.html",
  standings: "overall-driver-standings.html",
  teams: "overall-team-standings.html",
  results: "overall-7-driver-results.html",
  active: "overall-8-driver-results.html",
  tiera: "tiera-driver-standings.html",
  tierb: "tierb-driver-standings.html"
};

const width = Number(getOption("width", 1536));
const height = Number(getOption("height", 900));
const clickSelector = getOption("click", null);
const hoverSelector = getOption("hover", null);
const toggleSelector = getOption("toggle", null);
const scrollSelector = getOption("scroll", null);
const scrollX = Number(getOption("scroll-x", 0));
const websiteRoot = path.resolve(__dirname, "../hidden/out/preview/website");
const pageName = pageShortcuts[positional] || positional;
const targetPath = path.resolve(websiteRoot, pageName);

if (!targetPath.startsWith(`${websiteRoot}${path.sep}`)) {
  throw new Error("page must stay inside the generated preview website");
}
if (!fs.existsSync(targetPath) || path.extname(targetPath) !== ".html") {
  throw new Error(`generated preview page not found: ${pageName}`);
}
if (!Number.isInteger(width) || width < 320 || width > 3840) {
  throw new Error("width must be an integer between 320 and 3840");
}
if (!Number.isInteger(height) || height < 320 || height > 2160) {
  throw new Error("height must be an integer between 320 and 2160");
}
if (!Number.isInteger(scrollX) || scrollX < 0 || scrollX > 10000) {
  throw new Error("scroll-x must be an integer between 0 and 10000");
}

const requestedOutput = getOption(
  "output",
  `/tmp/rally-visual-${width}x${height}.png`
);
const outputPath = path.resolve(requestedOutput);
if (!outputPath.startsWith("/tmp/") || path.extname(outputPath) !== ".png") {
  throw new Error("output must be a PNG path under /tmp");
}

const inspectPage = async page =>
  page.evaluate(() => ({
    url: window.location.href,
    title: document.title,
    fonts: document.fonts.status,
    viewport: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    },
    document: {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      horizontalOverflow:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    },
    heading:
      document.querySelector(".page-heading__title")?.textContent.trim() ||
      null,
    layoutShifts: window.__visualCheckShifts || []
  }));

const run = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.evaluateOnNewDocument(() => {
      window.__visualCheckShifts = [];
      new window.PerformanceObserver(list => {
        list.getEntries().forEach(entry => {
          window.__visualCheckShifts.push({
            value: entry.value,
            time: entry.startTime,
            hadRecentInput: entry.hadRecentInput,
            sources: entry.sources.map(source =>
              source.node
                ? source.node.className || source.node.tagName
                : "unknown"
            )
          });
        });
      }).observe({ type: "layout-shift", buffered: true });
    });

    await page.goto(`file://${targetPath}`, { waitUntil: "networkidle0" });
    const before = await inspectPage(page);

    if (hoverSelector) {
      await page.hover(hoverSelector);
      await new Promise(resolve => setTimeout(resolve, 250));
    }

    if (toggleSelector) {
      await page.click(toggleSelector);
      await new Promise(resolve => setTimeout(resolve, 250));
    }

    if (scrollSelector) {
      await page.$eval(scrollSelector, element =>
        element.scrollIntoView({ block: "start" })
      );
      await new Promise(resolve => setTimeout(resolve, 250));
    }

    if (scrollX) {
      await page.$eval(
        ".table-scroll-wrapper",
        (element, left) => {
          element.scrollLeft = left;
        },
        scrollX
      );
      await new Promise(resolve => setTimeout(resolve, 250));
    }

    if (clickSelector) {
      const destination = await page.$eval(clickSelector, element => {
        if (element.tagName !== "A") {
          throw new Error("--click must select a link");
        }
        return element.href;
      });
      const destinationPath = path.resolve(new URL(destination).pathname);
      if (!destinationPath.startsWith(`${websiteRoot}${path.sep}`)) {
        throw new Error("clicked link must stay inside the preview website");
      }
      await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle0" }),
        page.click(clickSelector)
      ]);
      await new Promise(resolve => setTimeout(resolve, 250));
    }

    await page.screenshot({ path: outputPath, fullPage: false });
    const after = await inspectPage(page);
    console.log(
      JSON.stringify({ screenshot: outputPath, before, after }, null, 2)
    );
  } finally {
    await browser.close();
  }
};

run().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
