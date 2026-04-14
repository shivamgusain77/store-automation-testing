import { test, expect } from '@playwright/test';
import { baseClass } from '../../utils/baseClass.js';
import { businessMethod } from '../../utils/businessMethods.js';
import * as runconfig from '../../config.js';
import * as constant from '../../utils/constants.js';
const data = JSON.parse(JSON.stringify(require('../../test-data/productValidation.json')));

let pageObjectContext;
let testData;
let page;
let browserContext;

test.describe('Product Validation Test Suite', async () => {
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

  test('TC-01 Product Validation - search different products', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Perform login', async () => {
      await pageObjectContext.getStorePage().performLogin(testData, 'correct');
    });

    await test.step('Verify login and navigate to products', async () => {
      await pageObjectContext.getStorePage().verfiyAccountUsername(testData, 'login');
      await pageObjectContext.getStorePage().clickOnProductsButton();
    });

    for (const data of constant.products) {
      await test.step(`Search ${data} and valdiate result`, async () => {
        await pageObjectContext.getProductPage().searchProduct(data);
      });

      await test.step(`Validate search results are ${data}`, async () => {
        await pageObjectContext.getProductPage().verifyProductResults(data);
      });
    }
  });
});
