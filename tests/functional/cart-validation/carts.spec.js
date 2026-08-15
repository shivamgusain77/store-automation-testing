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
let productPriceArray = [];
let totalPrice;

test.describe('Product Validation Test Suite', () => {
  test.beforeEach(async ({ loggedInPage, browser }) => {
    // browserContext = await browser.newContext();
    // page = await browserContext.newPage();
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

    await test.step('Click on cart icon', async () => {
      await pageObjectContext.getProductPage().clickOnCart();
    });

    await test.step('Assert page load sucessfully and cart empty', async () => {
      await pageObjectContext.getCartPage().verifyCartPageLoaded();
      await pageObjectContext.getCartPage().verifyCartEmpty();
    });
  });

  test('TC-02 Cart Validation - verify cart page loads and verify its non-empty', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Navigate to product page', async () => {
      await pageObjectContext.getBusinessMethod().closeAdPopup();
      await pageObjectContext.getStorePage().clickOnProductsButton();
    });

    await test.step(`Add ${testData.productName} to cart`, async () => {
      await pageObjectContext.getProductPage().addProductToCart(testData.productName);
    });

    await test.step('Click on cart icon', async () => {
      await pageObjectContext.getProductPage().clickOnCart();
    });

    await test.step('Assert page load sucessfully and cart non-empty', async () => {
      await pageObjectContext.getCartPage().verifyCartPageLoaded();
      await pageObjectContext.getCartPage().verifyCartNotEmpty();
    });

    await test.step('Delete items form cart', async () => {
      await pageObjectContext.getCartPage().deleteItemsFromCart();
    });
  });

  test('TC-03 Cart Validation - verify checkout button', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Navigate to product page', async () => {
      await pageObjectContext.getBusinessMethod().closeAdPopup();
      await pageObjectContext.getStorePage().clickOnProductsButton();
    });

    await test.step(`Add ${testData.productName} to cart`, async () => {
      await pageObjectContext.getProductPage().addProductToCart(testData.productName);
    });

    await test.step('Click on cart icon', async () => {
      await pageObjectContext.getProductPage().clickOnCart();
    });

    await test.step('Assert page load sucessfully and cart non-empty', async () => {
      await pageObjectContext.getCartPage().verifyCartPageLoaded();
      await pageObjectContext.getCartPage().verifyCartNotEmpty();
    });

    await test.step('Verify checkout button', async () => {
      await pageObjectContext.getCartPage().verifyCheckoutButton();
    });

    await test.step('Click on checkout button', async () => {
      await pageObjectContext.getCartPage().clickOnCheckout();
    });

    await test.step('Verify checkout page load sucessfully', async () => {
      await pageObjectContext.getCheckoutPage().verifyCheckoutPageLoaded();
    });

    await test.step('Go back and delete items form cart', async () => {
      await pageObjectContext.getAction().goBack();
      await pageObjectContext.getCartPage().deleteItemsFromCart();
    });
  });

  test('TC-04 Cart Validation - verify product price calculation', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Navigate to product page', async () => {
      await pageObjectContext.getBusinessMethod().closeAdPopup();
      await pageObjectContext.getStorePage().clickOnProductsButton();
    });

    for (const data of testData.productName) {
      await test.step(`Add ${data} to cart`, async () => {
        await pageObjectContext.getProductPage().addProductToCart(data);
      });

      await test.step(`Get ${data} price`, async () => {
        const price = await pageObjectContext.getProductPage().getPriceOfProduct(data);
        productPriceArray.push(price);
      });
    }

    await test.step('Click on cart icon', async () => {
      await pageObjectContext.getProductPage().clickOnCart();
    });

    await test.step('Assert page load sucessfully and cart non-empty', async () => {
      await pageObjectContext.getCartPage().verifyCartPageLoaded();
      await pageObjectContext.getCartPage().verifyCartNotEmpty();
    });

    await test.step('Click on checkout button', async () => {
      await pageObjectContext.getCartPage().clickOnCheckout();
    });

    await test.step('Verify total price of cart', async () => {
      totalPrice = await pageObjectContext.getCheckoutPage().getTotalCartPrice();
      await pageObjectContext.getCheckoutPage().verifyTotalPrice(productPriceArray, totalPrice);
    });

    await test.step('Go back and delete items form cart', async () => {
      await pageObjectContext.getAction().goBack();
      await pageObjectContext.getCartPage().deleteItemsFromCart();
    });
  });

  test('TC-05 Cart Validation - verify checkout without login', async ({ browser }) => {
    let browserContext = await browser.newContext();
    let page = await browserContext.newPage();
    let pageObjectContext2 = new baseClass(page, expect, browserContext);

    await test.step('Navigate to the application', async () => {
      await pageObjectContext2.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Navigate to product page', async () => {
      await pageObjectContext2.getBusinessMethod().closeAdPopup();
      await pageObjectContext2.getStorePage().clickOnProductsButton();
    });

    await test.step(`Add ${testData.productName} to cart`, async () => {
      await pageObjectContext2.getProductPage().addProductToCart(testData.productName);
    });

    await test.step('Click on cart icon', async () => {
      await pageObjectContext2.getProductPage().clickOnCart();
    });

    await test.step('Click on checkout button', async () => {
      await pageObjectContext2.getCartPage().clickOnCheckout();
    });

    await test.step('Verify error message', async () => {
      await pageObjectContext2.getCartPage().verifyLoginMessage();
    });

    await page.context().close();
  });
});
