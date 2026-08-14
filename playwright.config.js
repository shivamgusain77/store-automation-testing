import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30 * 30 * 1000,

  expect: { tinmeout: 60 * 1000 },

  navigationTimeout: 60000,

  retries: 0,

  outputDir: './output/artifacts',

  reporter: [
    ['html', { outputFolder: 'output/test-report', open: 'never' }],
    ['junit', { outputFile: 'result.xml' }],
    ['list'],
  ],

  workers: '100%',

  fullyParallel: true,

  projects: [
    {
      name: 'Store_UI_Validation',
      testDir: './tests',
      testMatch: '**/*.spec.js',
      dependencies: ['App_Login'],
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
      },
    },
    {
      name: 'App_Login',
      testDir: './tests/login/',
      testMatch: '**/login.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
      },
    },
  ],
});
