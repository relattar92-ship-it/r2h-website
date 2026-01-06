// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
    headless: true, // Run tests in headless mode
    screenshot: 'only-on-failure', // Capture screenshot only when a test fails
    video: 'retain-on-failure', // Record video only when a test fails
  },
  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: 'html',
});
