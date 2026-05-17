import { expect } from '@playwright/test';
import { baseClass } from '../../../utils/baseClass.js';
import { businessMethod } from '../../../utils/businessMethods.js';
import * as runconfig from '../../../config.js';
import * as constant from '../../../utils/constants.js';
const data = JSON.parse(JSON.stringify(require('../../../test-data/productValidation.json')));
import { test } from '../../../fixtures/loginFixture.js';

let pageObjectContext;
let testData;
let page;
let browserContext;
let productPrice;

test.describe('Product Validation Test Suite', () => {
  test.beforeEach(async ({ loggedInPage }) => {
    // browserContext = await browser.newContext();
    // page = await browserContext.newPage();
    pageObjectContext = new baseClass(loggedInPage, expect, loggedInPage.context());
    let testContext = new businessMethod(loggedInPage, expect, loggedInPage.context());
    testData = await testContext.getTestDataForTestcases(data, test.info().title);
  });

  test.afterEach(async ({ loggedInPage }) => {
    await loggedInPage.context().close();
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
      await pageObjectContext.getAction().waitForPageLoad();
      const productPriceOnDetailPage = await pageObjectContext
        .getProductDetailPage()
        .getProductPriceFromDetails(testData.productName);
      await pageObjectContext.getAssert().verifyTextEquals(productPrice, productPriceOnDetailPage);
    });
  });

  test('TC-05 Product Validation - verify product description', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Navigate to product page', async () => {
      await pageObjectContext.getStorePage().clickOnProductsButton();
    });

    await test.step(`Search ${data.productName} and `, async () => {
      await pageObjectContext.getProductPage().searchProduct(testData.productName);
    });

    await test.step('Go to product details', async () => {
      await pageObjectContext.getProductPage().clickOnViewProduct(testData.productName);
    });

    await test.step('Verify product description', async () => {
      await pageObjectContext
        .getProductDetailPage()
        .verifyProductDescriptions(testData.productName);
    });
  });

  test('TC-06 Product Validation - verify product image loads', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Navigate to product page', async () => {
      await pageObjectContext.getStorePage().clickOnProductsButton();
    });

    await test.step(`Search ${data.productName} and `, async () => {
      await pageObjectContext.getProductPage().searchProduct(testData.productName);
    });

    await test.step('Go to product details', async () => {
      await pageObjectContext.getProductPage().clickOnViewProduct(testData.productName);
    });

    await test.step('Verify image loading', async () => {
      await pageObjectContext.getProductDetailPage().verifyImageLoad();
    });
  });
});
