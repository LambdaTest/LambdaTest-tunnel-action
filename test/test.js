const webdriver = require("selenium-webdriver");
const assert = require("assert");
const gridHost = "hub.lambdatest.com/wd/hub";

async function executeTest() {
  // Setup Input capabilities
  const capabilities = {
    platform: "windows 10",
    browserName: "chrome",
    version: "75.0",
    tunnel: true,
    video: true,
    tunnelName: process.env.tunnelName,
    name: "Test 1", // name of the test
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
    await driver.get("http://localhost:8888/");
    const body = await driver.findElement(webdriver.By.tagName("body"));
    assert.strictEqual(await body.getText(), "LambdaTest Tunnel");
  } finally {
    await driver.quit();
  }
}
executeTest();