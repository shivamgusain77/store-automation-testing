import { test, expect } from "@playwright/test";
import { baseClass } from "../utils/baseClass.js";
import { businessMethods } from "../utils/businessMethods.js";
const data = JSON.parse(JSON.stringify(require("../test-data/store.json")));

let pageObjectContext;

test.describe("Regression Test Suite", async () => {
  test.beforeEach(async ({ browser }) => {
    browserContext = await browser.newContext();
    page = await browserContext.newPage();

    pageObjectContext = new baseClass(page, expect, browserContext);
    let testContext = new businessMethods(page, expect, browserContext);
    testData = await testContext.getTestDataForTestcases(data, test.info().title);
  });

  test("TC-01 Home Page Check - Title", async ({ page }) => {
    await page.goto("https://www.demoblaze.com/");

    const pageTitle = await page.title();
    console.log(pageTitle);

    await expect(pageTitle).toBe("STORE");
  });
});
