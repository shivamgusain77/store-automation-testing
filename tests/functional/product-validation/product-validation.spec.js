import { test, expect } from '@playwright/test';
import { baseClass } from '../../../utils/baseClass.js';
import { businessMethod } from '../../../utils/businessMethods.js';
import * as runconfig from '../../../config.js';
import * as constant from '../../../utils/constants.js';
const data = JSON.parse(JSON.stringify(require('../../../test-data/productValidation.json')));

let pageObjectContext;
let testData;
let page;
let browserContext;
let productPrice;

test.use({ storageState: 'auth/auth.json' });

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

  test('TC-02 Product Validation - view product detail', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Navigate to product page', async () => {
      await pageObjectContext.getStorePage().clickOnProductsButton();
    });

    await test.step('Click view product of ' + testData.productName, async () => {
      await pageObjectContext.getAction().waitForPageLoad();
      await pageObjectContext.getProductPage().clickOnViewProduct(testData.productName);
    });

    await test.step('Verify product name in details page', async () => {
      await pageObjectContext.getProductDetailPage().verifyProductDetails(testData.productName);
    });
  });

  test('TC-03 Product Validation - search product by category', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Navigate to product page', async () => {
      await pageObjectContext.getStorePage().clickOnProductsButton();
    });

    await test.step(`Click on category ${testData.category} and sub-category ${testData.subCategory}`, async () => {
      await pageObjectContext
        .getProductPage()
        .viewUsingCategory(testData.category, testData.subCategory);
    });

    await test.step('View Product Results', async () => {
      await pageObjectContext.getProductPage().verifyProductResults(testData.subCategory);
      await pageObjectContext
        .getProductPage()
        .verifyProductPageTitle(testData.category, testData.subCategory);
    });
  });

  test('TC-04 Product Validation - verify product price', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Navigate to product page', async () => {
      await pageObjectContext.getStorePage().clickOnProductsButton();
    });

    await test.step(`Search ${data.productName} and `, async () => {
      await pageObjectContext.getProductPage().searchProduct(testData.productName);
    });

    await test.step('Verify price details on product page', async () => {
      productPrice = await pageObjectContext
        .getProductPage()
        .getPriceOfProduct(testData.productName);
    });

    await test.step('Go to product details', async () => {
      await pageObjectContext.getProductPage().clickOnViewProduct(testData.productName);
    });

    await test.step('Verify product price in details', async () => {
      const productPriceOnDetailPage = await pageObjectContext
        .getProductDetailPage()
        .getProductPriceFromDetails();
      await pageObjectContext.getAssert().verifyTextEquals(productPrice, productPriceOnDetailPage);
    });
  });
});
