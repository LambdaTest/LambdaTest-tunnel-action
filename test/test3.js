const webdriver = require("selenium-webdriver");
const assert = require("assert");
const gridHost = "hub.lambdatest.com/wd/hub";

async function executeTest() {
  // Setup Input capabilities
  const capabilities = {
    platform: "windows 10",
    browserName: "chrome",
    version: "114.0",
    tunnel: true,
    video: true,
    tunnelName: process.env.tunnelName,
    name: "Test 3", // name of the test
    build: "NodeJS build", // name of the build
  };

  // URL: https://{username}:{accessKey}@hub.lambdatest.com/wd/hub
  const gridUrl = `https://${process.env.username}:${process.env.accessKey}@${gridHost}`;
  console.log(gridUrl)
  const driver = new webdriver.Builder()
    .usingServer(gridUrl)
    .withCapabilities(capabilities)
    .build();

  try {
    await driver.get("https://the-internet.herokuapp.com/basic_auth");
    const content = await driver.findElement(webdriver.By.xpath("(//p[contains(text(),'Congratulations! You must have the proper credenti')])[1]"));
    assert.strictEqual(await content.getText(), "Congratulations! You must have the proper credentials.");
  } finally {
    await driver.quit();
  }
}
executeTest();