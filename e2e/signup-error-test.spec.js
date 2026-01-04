const { test, expect } = require('@playwright/test');

test.describe('Signup Page Error Handling', () => {
  // Seed the database before running the test
  test.beforeEach(async ({ page }) => {
    // Using page.request to make API calls is a best practice for setting up test state.
    const response = await page.request.post('/api/test/seed');
    expect(response.ok()).toBeTruthy();
  });

  test('should display an error message for existing email', async ({ page }) => {
    await page.goto('/auth/signup');

    // Fill in the form
    await page.fill('input[placeholder="Ahmed Al Rashid"]', 'Test User');
    await page.fill('input[placeholder="50 123 4567"]', '1234567890');
    await page.fill('input[placeholder="engineer@company.ae"]', 'existing@example.com');
    await page.fill('input[placeholder="Min. 8 characters"]', 'password123');

    // Click "Next"
    await page.click('button:has-text("Next")');

    // The default plan has a price, so the button text is "Pay & Continue"
    const finalButtonSelector = 'button:has-text("Pay & Continue")';

    // Wait for the final button to be visible
    await page.waitForSelector(finalButtonSelector);

    // Click the final button
    await page.click(finalButtonSelector);

    // Wait for the error message to appear using a more specific selector
    const errorContainer = page.locator('div[class*="bg-red-500/10"]');
    await expect(errorContainer).toBeVisible();
    await expect(errorContainer).toContainText("Account already exists with this email");


    // Take a screenshot for verification
    await page.screenshot({ path: '/home/jules/verification/signup-error-final.png' });
  });
});
