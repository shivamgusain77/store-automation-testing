import { test, expect } from "@playwright/test";
import { baseClass } from "../../utils/baseClass.js";
import { businessMethod } from "../../utils/businessMethods.js";
const data = JSON.parse(JSON.stringify(require("../../test-data/store.json")));

let pageObjectContext;
let testData;
let page;
let browserContext;

test.describe("Regression Test Suite", async () => {
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

  test("TC-01 Home Page Check - Title", async () => {
    await test.step("Navigate to the application and verify the title", async () => {
      await pageObjectContext.getAction().navigateToURL(testData.url);
      await pageObjectContext.getAsset().verifyPageTitle(testData.expectedTitle);
    });
  });
});
