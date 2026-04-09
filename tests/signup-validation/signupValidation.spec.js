import { test, expect } from '@playwright/test';
import { baseClass } from '../../utils/baseClass.js';
import { businessMethod } from '../../utils/businessMethods.js';
import * as runconfig from '../../config.js';
import * as constant from '../../utils/constants.js';
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
      await pageObjectContext.getStorePage().signUp(testData.signUpName, testData.signUpEmail);
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

  test('TC-02 Signup Validation- with exisitng mail', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Enter name and  exisitng email and click on signup', async () => {
      await pageObjectContext.getStorePage().signUp(testData.signUpName, runconfig.username);
    });

    await test.step('Verify error message', async () => {
      await pageObjectContext.getStorePage().verifyEmailExistError();
    });
  });

  test('TC-03 Signup Validation- Without filling required field', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    await test.step('Enter name and  exisitng email and click on signup', async () => {
      await pageObjectContext.getStorePage().signUp(testData.signUpName, testData.signUpEmail);
    });

    await test.step('Click create account button', async () => {
      await pageObjectContext.getStorePage().clickCreateAccButton();
    });

    await test.step('Verify error message to fill required fields', async () => {
      await pageObjectContext.getStorePage().verifyFillRequiredFieldMessage();
    });
  });

  test('TC-04 Signup Validation- Invalid email format', async () => {
    await test.step('Navigate to the application', async () => {
      await pageObjectContext.getAction().navigateToURL(runconfig.siteURl);
    });

    for (const data of constant.invalidEmails) {
      await test.step(`Enter name and invalid email as ${data.value} and verify error message`, async () => {
        await pageObjectContext.getStorePage().signUp(testData.signUpName, data.value);
        await pageObjectContext.getStorePage().verifyInvalidFormatErrorMessage(data.expected);
      });
    }
  });
});
