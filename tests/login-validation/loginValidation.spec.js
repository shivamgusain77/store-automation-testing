import { test, expect } from "@playwright/test";
import { baseClass } from "../../utils/baseClass.js";
import { businessMethod } from "../../utils/businessMethods.js";
import * as runconfig from "../../config.js";
const data = JSON.parse(JSON.stringify(require("../../test-data/loginValidation.json")));

let pageObjectContext;
let testData;
let page;
let browserContext;

test.describe("Login Validation Test Suite", async () => {
  test.beforeEach(async ({ browser }) => {
    browserContext = await browser.newContext();
    page = await browserContext.newPage();
    pageObjectContext = new baseClass(page, expect, browserContext);
    let testContext = new businessMethod(page, expect, browserContext);
    testData = await testContext.getTestDataForTestcases(data, test.info().title);
  });

  test.afterEach(async () => {
    await browserContext.close();
  });

  test("TC-01 Login Validation - Valid Credentials", async () => {
    await test.step("Navigate to the application", async () => {
      await pageObjectContext.getAction().navigateToURL(testData.url);
    });

    await test.step("Perform login with valid credentials", async () => {
      await pageObjectContext.getStorePage().clickLoginButton();
    });

    await test.step("Fill valid username and password and submit", async () => {
      await pageObjectContext.getStorePage().performLogin();
    });

    await test.step("Verify sucesfully logined as" + runconfig.username, async () => {
      await pageObjectContext.getStorePage().verifyLogin();
    });
  });
});
