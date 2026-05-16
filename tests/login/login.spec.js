import { test, expect } from '@playwright/test';
import { baseClass } from '../../utils/baseClass.js';
import * as runconfig from '../../config.js';

test('TC-01 Product Validation - search different products', async ({ browser }) => {
  const context = await browser.newContext();
  const newPage = await context.newPage();
  const pageContext = new baseClass(newPage, expect, browser);
  await pageContext.getAction().navigateToURL(runconfig.siteURl);
  await pageContext.getStorePage().performLogin('correct');
  await pageContext.getAssert().verifyURL('https://automationexercise.com/', 'Login');
  await context.storageState({ path: 'auth/auth.json' });
  await context.close();
});
