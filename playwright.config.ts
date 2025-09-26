import { defineConfig, devices } from '@playwright/test';
import { getConfig } from './config/environment';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

const config = getConfig();

export default defineConfig({
  testDir: './tests',
  /* Global setup - runs once before all tests to verify site accessibility */
  globalSetup: require.resolve('./global-setup'),
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : 5,
  /* Test timeout - increased for stability */
  timeout: 120000, // 2 minutes per test
  /* Expect timeout for assertions */
  expect: {
    timeout: 10000 // 10 seconds for assertions
  },
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: config.baseUrl,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',
    
    /* Global timeout for actions */
    actionTimeout: config.browser.timeout,
    
    /* Global timeout for navigation */
    navigationTimeout: config.browser.timeout,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: config.browser.headless,
        viewport: config.browser.headless ? { width: 1920, height: 1080 } : null, // Use viewport in headless mode
        deviceScaleFactor: config.browser.headless ? 1 : undefined, // Set deviceScaleFactor in headless mode
        launchOptions: {
          args: config.browser.headless ? ['--no-sandbox', '--disable-dev-shm-usage'] : ['--start-maximized']
        }
      },
    },

    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        headless: config.browser.headless,
        viewport: config.browser.headless ? { width: 1920, height: 1080 } : null, // Use viewport in headless mode
        deviceScaleFactor: config.browser.headless ? 1 : undefined, // Set deviceScaleFactor in headless mode
        launchOptions: {
          args: config.browser.headless ? ['--no-sandbox', '--disable-dev-shm-usage'] : ['--start-maximized']
        }
      },
    },

    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        headless: config.browser.headless,
        viewport: config.browser.headless ? { width: 1920, height: 1080 } : null, // Use viewport in headless mode
        deviceScaleFactor: config.browser.headless ? 1 : undefined, // Set deviceScaleFactor in headless mode
        launchOptions: {
          args: config.browser.headless ? ['--no-sandbox', '--disable-dev-shm-usage'] : ['--start-maximized']
        }
      },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { 
        ...devices['Pixel 5'],
        headless: config.browser.headless
      },
    },
    {
      name: 'Mobile Safari',
      use: { 
        ...devices['iPhone 12'],
        headless: config.browser.headless
      },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { 
        ...devices['Desktop Edge'], 
        channel: 'msedge',
        headless: config.browser.headless,
        viewport: config.browser.headless ? { width: 1920, height: 1080 } : null, // Use viewport in headless mode
        deviceScaleFactor: config.browser.headless ? 1 : undefined, // Set deviceScaleFactor in headless mode
        launchOptions: {
          args: config.browser.headless ? ['--no-sandbox', '--disable-dev-shm-usage'] : ['--start-maximized']
        }
      },
    },
  ]
});
