import { test as base } from '@playwright/test';

export const test = base.extend({
  loggedInPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'auth/auth.json',
    });

    const page = await context.newPage();

    await use(page);

    await context.close();
  },
});
