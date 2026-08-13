import { expect } from '@playwright/test';
import { baseClass } from '../../../utils/baseClass.js';
import { businessMethod } from '../../../utils/businessMethods.js';
import * as runconfig from '../../../config.js';
import * as constant from '../../../utils/constants.js';
const data = JSON.parse(JSON.stringify(require('../../../test-data/cart.json')));
import { test } from '../../../fixtures/loginFixture.js';

let pageObjectContext;
let testData;
let page;
let browserContext;
let productPrice;

test.describe('Product Validation Test Suite', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    pageObjectContext = new baseClass(loggedInPage, expect, loggedInPage.context());
    let testContext = new businessMethod(loggedInPage, expect, loggedInPage.context());
    testData = await testContext.getTestDataForTestcases(data, test.info().title);
  });

  test.afterEach(async ({ loggedInPage }) => {
    await loggedInPage.context().close();
  });

  test('TC-01 Cart Validation - verify cart page loads and verify its empty', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Clcik on cart icon', async () => {
      await pageObjectContext.getProductPage().clickOnCart();
    });

    await test.step('asset page load sucessfully and cart empty', async () => {
      await pageObjectContext.getCartPage().verifyCartPageLoaded();
      await pageObjectContext.getCartPage().verifyCartEmpty();
    });
  });
});
