const { test, expect } = require('@playwright/test');

test.describe('Signup Page Free Plan', () => {
  test('should successfully create a free account and redirect to verification', async ({ page }) => {
    // Navigate to the signup page with the free "associate" plan pre-selected
    await page.goto('/auth/signup?plan=associate');

    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    // Fill in the form
    await page.fill('input[placeholder="Ahmed Al Rashid"]', 'Free Plan User');
    await page.fill('input[placeholder="50 123 4567"]', '0987654321');
    await page.fill('input[placeholder="engineer@company.ae"]', uniqueEmail);
    await page.fill('input[placeholder="Min. 8 characters"]', 'password123');

    // Click "Next"
    await page.click('button:has-text("Next")');

    // The button for the free plan should be "Create Account"
    const finalButtonSelector = 'button:has-text("Create Account")';

    // Wait for the final button to be visible
    await page.waitForSelector(finalButtonSelector);

    // Click the final button
    await page.click(finalButtonSelector);

    // Verify that the page redirects to the verification page
    await page.waitForURL(`/auth/verify?email=${encodeURIComponent(uniqueEmail)}`);

    // Take a screenshot for verification
    await page.screenshot({ path: '/home/jules/verification/signup-free-plan-success.png' });
  });
});
