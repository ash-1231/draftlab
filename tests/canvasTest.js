const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function canvasTest() {

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
    console.log("🚀 Starting Canvas Test...\n");

    await driver.get('http://localhost:3000/dashboard');
    console.log("✅ Opened Dashboard");

    // 👉 Click New File
    let newFileBtn = await driver.wait(
      until.elementLocated(By.id('newFileBtn')),
      10000
    );
    await newFileBtn.click();
    console.log("✅ Clicked New File");

    // 👉 Wait for input
    let input = await driver.wait(
      until.elementLocated(By.css('input[placeholder="Enter File Name"]')),
      10000
    );

    await input.sendKeys("Canvas Test File");

    // 👉 Click Create
    let createBtn = await driver.findElement(
      By.xpath("//button[contains(text(),'Create')]")
    );
    await createBtn.click();
    console.log("✅ Clicked Create");

    // 🔥 WAIT for dialog to disappear
    await driver.wait(
      until.stalenessOf(input),
      10000
    );

    // 🔥 WAIT for redirect
    await driver.wait(until.urlContains("workspace"), 15000);
    console.log("✅ Redirected to Workspace");

    // 🎨 Now interact with canvas safely
    let canvas = await driver.wait(
      until.elementLocated(By.css('canvas')),
      10000
    );

    console.log("🎉 Canvas Loaded Successfully");

    console.log("\n🎉 TEST RESULT: PASS ✅");

  } catch (err) {
    console.log("\n❌ Canvas Test Failed ❌");
    console.error(err);
  } finally {
    await driver.quit();
    console.log("\n🧹 Browser Closed");
  }

})();