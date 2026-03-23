import { test, expect } from '@playwright/test';
import { baseClass } from '../../utils/baseClass.js';
import { businessMethod } from '../../utils/businessMethods.js';
import * as runconfig from '../../config.js';
const data = JSON.parse(JSON.stringify(require('../../test-data/signUpValidation.json')));

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

  test('TC01 - Signup Validation - Sucessfull Signup', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Enter name and email and click on signup', async () => {
      await pageObjectContext.getStorePage().signUp(testData);
    });

    await test.step('Fill account inforamtion and create account', async () => {
      await pageObjectContext.getStorePage().fillAccountInfo(testData);
    });

    await test.step('verify account create sucessfully and continue', async () => {
      await pageObjectContext.getStorePage().verfiyAccountCreated();
    });

    await test.step('verify account username', async () => {
      await pageObjectContext.getStorePage().verfiyAccountUsername(testData);
    });

    await test.step('delete account and verify', async () => {
      await pageObjectContext.getStorePage().deleteAccount();
    });
  });
});
