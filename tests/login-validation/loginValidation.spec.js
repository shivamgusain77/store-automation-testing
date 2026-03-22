import { test, expect } from '@playwright/test';
import { baseClass } from '../../utils/baseClass.js';
import { businessMethod } from '../../utils/businessMethods.js';
import * as runconfig from '../../config.js';
const data = JSON.parse(JSON.stringify(require('../../test-data/loginValidation.json')));

let pageObjectContext;
let testData;
let page;
let browserContext;

test.describe('Login Validation Test Suite', async () => {
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

  test('TC-01 Login Validation - Valid Credentials', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Fill valid username and password and submit', async () => {
      await pageObjectContext.getStorePage().performLogin(testData, 'correct');
    });

    await test.step('Verify sucesfully logined as' + runconfig.username, async () => {
      await pageObjectContext.getStorePage().verifyLogin();
    });
  });

  test('TC-02 Login Validation - Invalid Password', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Fill valid username and invalid password and submit', async () => {
      await pageObjectContext.getStorePage().performLogin(testData, 'invalid password');
    });

    await test.step('Verify error message', async () => {
      await pageObjectContext.getStorePage().verifyErrorMessageDisplayed();
    });
  });

  test('TC-03 Login Validation - Invalid Username', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Fill valid username and invalid password and submit', async () => {
      await pageObjectContext.getStorePage().performLogin(testData, 'invalid username');
    });

    await test.step('Verify error message', async () => {
      await pageObjectContext.getStorePage().verifyErrorMessageDisplayed();
    });
  });

  test('TC-04 Logout Validation - User able to logout', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Fill valid username and password and submit', async () => {
      await pageObjectContext.getStorePage().performLogin(testData, 'correct');
    });

    await test.step('Click on burger icon and logout', async () => {
      await pageObjectContext.getStorePage().clickOnBurgericon();
      await pageObjectContext.getStorePage().loggOutUser();
    });

    await test.step('verify back to login page', async () => {
      await pageObjectContext.getStorePage().verifyLoginPageLogo();
    });
  });

  test('TC-05 Login Validation - Session Persistent after refresh', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Fill valid username and password and submit', async () => {
      await pageObjectContext.getStorePage().performLogin(testData, 'correct');
    });

    await test.step('refresh the page', async () => {
      await pageObjectContext.getAction().refreshPage();
    });

    await test.step('Verify session persistent', async () => {
      await pageObjectContext.getStorePage().verifyLogin();
    });
  });
});
