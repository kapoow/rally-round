const puppeteer = require("puppeteer");
const fs = require("fs");
const axios = require("axios");
const validCreds = {};
const debug = require("debug")("tkidman:rally-round:wrcAPI:getCreds");
const axiosInstance = axios.create({
  httpsAgent: new (require("https").Agent)({
    rejectUnauthorized: false
  })
});
const racenetDomain = "https://web-api.racenet.com";
const { handle2FA } = require("./gmail2fa");

const delay = time => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};

const waitForAuthResponse = (page, timeout = 60000) => {
  let cancel = () => {};

  const promise = new Promise((resolve, reject) => {
    let settled = false;

    const finish = (fn, value) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      page.off("response", onResponse);
      fn(value);
    };

    const timer = setTimeout(() => {
      finish(
        reject,
        new Error(`Timed out waiting for EA auth response after ${timeout}ms`)
      );
    }, timeout);

    const onResponse = async response => {
      if (
        !response
          .url()
          .includes("https://web-api.racenet.com/api/identity/auth")
      ) {
        return;
      }

      if (response.status() !== 200) {
        finish(
          reject,
          new Error(`EA auth request failed with status ${response.status()}`)
        );
        return;
      }

      try {
        debug("200 auth response found");
        const responseBody = await response.text();
        const authData = JSON.parse(responseBody);
        const tokens = {
          accessToken: authData.access_token,
          refreshToken: authData.refresh_token
        };
        finish(resolve, tokens);
      } catch (error) {
        finish(reject, error);
      }
    };

    cancel = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      page.off("response", onResponse);
    };

    page.on("response", onResponse);
  });

  return {
    promise,
    cancel
  };
};

const getCreds = async () => {
  if (validCreds.accessToken) {
    return validCreds;
  }
  if (fs.existsSync("./tokens.json")) {
    const cachedCreds = JSON.parse(fs.readFileSync("./tokens.json"));
    debug("cached creds found, checking if valid");
    // validate the token
    try {
      const response = await axiosInstance({
        method: "GET",
        url: `${racenetDomain}/api/wrc2023clubs/67`,
        headers: { Authorization: `Bearer ${cachedCreds.accessToken}` }
      });
      if (response.status === 200) {
        debug("cached creds valid, using");
        validCreds.accessToken = cachedCreds.accessToken;
        return validCreds;
      }
    } catch (e) {
      debug(e.message);
    }
    debug("cached creds invalid, will regenerate");
  }
  const promise = new Promise((resolve, reject) => {
    login(resolve, reject);
  });
  const creds = await promise;
  validCreds.accessToken = creds.accessToken;
  return validCreds;
};

const navigateToLogin = async page => {
  try {
    const url =
      "https://accounts.ea.com/connect/auth?client_id=RACENET_1_JS_WEB_APP&response_type=code&redirect_uri=https://racenet.com/oauthCallback";
    await page.goto(url);

    // Check for SSL certificate warning and click proceed if present
    try {
      const proceedLink = await page.$("#proceed-link");
      if (proceedLink) {
        debug("SSL certificate warning detected, clicking proceed link");
        await proceedLink.click();
        await delay(2000);
      }
    } catch (_e) {
      // No SSL warning, continue normally
    }

    return page.evaluate(() => document.title);
  } catch (err) {
    debug(err.message);
    return false;
  }
};

const login = async (resolve, reject) => {
  const username = process.env.RACENET_USERNAME;
  const password = process.env.RACENET_PASSWORD;

  // Launch Puppeteer and create a new page
  const browser = await puppeteer.launch({
    headless: process.env.SHOW_BROWSER === "true" ? false : "new",
    args: [
      "--user-agent=Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.0 Safari/537.36",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--single-process",
      "--disable-gpu"
    ]
  });
  const page = await browser.newPage();
  const { promise: authResponsePromise, cancel: cancelAuthResponseWait } =
    waitForAuthResponse(page);
  let cleanedUp = false;

  const cleanup = async () => {
    if (cleanedUp) return;
    cleanedUp = true;

    cancelAuthResponseWait();

    if (!page.isClosed()) {
      await page.close();
    }
    await browser.close();
  };

  let data = false;
  let attempts = 0;

  // Retry request until it gets data or tries 5 times
  while (data === false && attempts < 5) {
    debug(`navigating to EA, attempt ${attempts}`);
    data = await navigateToLogin(page);
    attempts += 1;
    if (data === false) {
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
  if (data === false) {
    debug("failed to get to login page, closing headless browser");
    await cleanup();
    reject(new Error("failed to get to login page"));
    return;
  }

  try {
    // Enters login information and click the "Sign in" button on the login page
    debug(`using creds ${username} ${password.slice(0, 2)}`);
    await page.type("#email", username);
    await page.click("#logInBtn");
    debug("login entered");
    await delay(2000);
    // await page.waitForNavigation({ waitUntil: "networkidle2" });
    await page.type("#password", password);
    await page.click("#logInBtn");
    debug("password entered");

    // Check if 2FA is required and handle it
    const twoFactorHandled = await handle2FA(page);
    if (twoFactorHandled) {
      debug("2FA was handled successfully");
      debug("Waiting for navigation after 2FA...");
    } else {
      debug("No 2FA required");
      debug("Waiting for normal navigation...");
    }

    await page.waitForNavigation({ waitUntil: "networkidle2", timeout: 30000 });
    await delay(4000);

    const tokens = await authResponsePromise;

    debug("writing tokens to tokens.json");
    fs.writeFileSync("tokens.json", JSON.stringify(tokens, null, 2));
    debug("credentials retrieved, closing headless browser");
    await cleanup();
    resolve(tokens);
  } catch (error) {
    await cleanup();
    debug("An error occurred:", error);
    reject(error);
    return;
  }
};

module.exports = { getCreds };
