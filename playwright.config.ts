import { defineConfig, devices } from '@playwright/test';

// Create a timestamped folder for each test execution under tests/output
const runTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
const runOutputRoot = `tests/output/${runTimestamp}`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files that end with .spec.ts */
  testMatch: '**/*.spec.ts',
  /* Consolidate all test artifacts in one folder (timestamped per run) */
  outputDir: `${runOutputRoot}/test-results`,
  
  /* Run tests in parallel */
  fullyParallel: true,
  headless: false,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Run with 3 parallel workers locally, 1 on CI */
  workers: process.env.CI ? 1 : 3,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: `${runOutputRoot}/playwright-report` }],
    ['json', { outputFile: `${runOutputRoot}/playwright-results.json` }],
    ['junit', { outputFile: `${runOutputRoot}/junit-results.xml` }],
    ['list'],
  ],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://utkarsh.site',

    /* Slow down each action by SLOWMO ms (set via env var) so headed runs are watchable. */
    launchOptions: {
      slowMo: Number(process.env.SLOWMO) || 0,
    },

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },

  /* Global timeout (generous because headless: false means real browser
     windows launch under parallel worker contention, which can be slow) */
  timeout: 60 * 1000,
  
  /* Expect timeout */
  expect: {
    timeout: 5000,
  },
});
