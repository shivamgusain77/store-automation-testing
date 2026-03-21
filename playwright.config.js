import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 30 * 30 * 1000,

  expect: { tinmeout: 60 * 1000 },

  navigationTimeout: 60000,

  retries: 0,

  outputDir: "./output/artifacts",

  reporter: [
    ["html", { outputFolder: "output/test-report", open: "never" }],
    ["junit", { outputFile: "result.xml" }],
  ],

  workers: "100%",

  fullyParallel: true,

  projects: [
    {
      name: "Store UI Validation",
      testDir: "./tests",
      testMatch: "**/*.spec.js",
      use: { ...devices["Desktop Chrome"], headless: false },
    },
  ],
});
