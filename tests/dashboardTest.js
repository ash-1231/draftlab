const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function dashboardTest() {

  // 🔧 Chrome Options (clean logs)
  let options = new chrome.Options();
  options.addArguments('--log-level=3');
  options.addArguments('--disable-logging');
  options.addArguments('--silent');
  options.addArguments('--ignore-certificate-errors');
  options.addArguments('--allow-insecure-localhost');

  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    console.log("🚀 Starting Dashboard Test...\n");

    // 🌐 Open app
    await driver.get('http://localhost:3000');
    console.log("✅ Opened Homepage");

    // 👉 Go to dashboard (adjust if needed)
    console.log("➡️ Trying Dashboard...");
    await driver.get('http://localhost:3000/dashboard');

    await driver.wait(until.urlContains("dashboard"), 10000);
    console.log("✅ Dashboard Loaded");

    // 🔍 Find New File button
    let newFileBtn = await driver.wait(
      until.elementLocated(By.id('newFileBtn')),
      10000
    );
    console.log("✅ New File Button Found");

    // 👆 Click New File
    await newFileBtn.click();
    console.log("✅ Clicked New File");

    // 📝 Wait for input field (dialog)
    let input = await driver.wait(
      until.elementLocated(By.css('input[placeholder="Enter File Name"]')),
      10000
    );

    // ✍️ Enter file name
    await input.sendKeys("Test File");
    console.log("✅ Entered File Name");

    // 🔘 Click Create button
    let createBtn = await driver.findElement(
      By.xpath("//button[contains(text(),'Create')]")
    );
    await createBtn.click();
    console.log("✅ Clicked Create");

    // 🔄 Wait for redirect to workspace
    await driver.wait(until.urlContains("workspace"), 15000);

    let currentUrl = await driver.getCurrentUrl();

    // 🧪 Assertion
    if (currentUrl.includes("workspace")) {
      console.log("\n🎉 TEST RESULT: PASS ✅");
      console.log("👉 File Created & Redirected Successfully");
    } else {
      console.log("\n❌ TEST RESULT: FAIL");
      console.log("👉 No Redirect to Workspace");
    }

  } catch (err) {
    console.log("\n❌ TEST RESULT: ERROR");
    console.log("👉 Dashboard Test Failed");
    console.error(err);
  } finally {
    await driver.quit();
    console.log("\n🧹 Browser Closed");
  }

})();