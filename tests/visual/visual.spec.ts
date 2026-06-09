import { test, expect } from '../../fixtures/testFixtures';

test.describe('@visual Visual regression tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Visual test for Login page', async ({ page }) => {
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixels: 100,
    });
  });

  test('Visual test for the page logo', async ({ authSteps }) => {
    const logoLocator = authSteps.getLogoLocator();
    await expect(logoLocator).toHaveScreenshot('saucedemo-logo.png');
  });
});
