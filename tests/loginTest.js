const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function loginTest() {

  // 🔧 Chrome Options (clean logs)
  let options = new chrome.Options();
  options.addArguments('--log-level=3'); // suppress most logs
  options.addArguments('--disable-logging');
  options.addArguments('--silent');
  options.addArguments('--ignore-certificate-errors');
  options.addArguments('--allow-insecure-localhost');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    console.log("🚀 Starting Login Test...\n");

    // 🌐 Open app
    await driver.get('http://localhost:3000');
    console.log("✅ Opened Homepage");

    // 🔍 Find Login Button
    let loginBtn = await driver.wait(
      until.elementLocated(By.id('loginBtn')),
      10000
    );

    console.log("✅ Login Button Found");

    // 👆 Click Login
    await loginBtn.click();
    console.log("✅ Clicked Login");

    // 🔄 Wait for redirect (better than sleep)
    await driver.wait(async () => {
      let url = await driver.getCurrentUrl();
      return url.includes("accounts.google.com") || url.includes("kinde");
    }, 15000);

    let currentUrl = await driver.getCurrentUrl();

    // 🧪 Assertion
    if (currentUrl.includes("accounts.google.com") || currentUrl.includes("kinde")) {
      console.log("\n🎉 TEST RESULT: PASS ✅");
      console.log("👉 Auth Redirect Working");
    } else {
      console.log("\n❌ TEST RESULT: FAIL");
      console.log("👉 Auth Not Triggered");
    }

  } catch (err) {
    console.log("\n❌ TEST RESULT: ERROR");
    console.log("👉 Login Test Failed");
    console.error(err);
  } finally {
    await driver.quit();
    console.log("\n🧹 Browser Closed");
  }

})();