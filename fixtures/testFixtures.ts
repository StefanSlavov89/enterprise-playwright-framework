import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutSteps } from '../steps/CheckoutSteps';
import { AuthenticationSteps } from '../steps/AuthenticationSteps';
import { CartSteps } from '../steps/CartSteps';
import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';

export const test = base.extend<{
  checkoutSteps: CheckoutSteps;
  authSteps: AuthenticationSteps;
  cartSteps: CartSteps;
  loginPage: LoginPage;
  cartPage: CartPage;
  authedContext: Page;
  loggedInPage: Page;
  speedyPage: Page;
  authedCartSteps: CartSteps;
  authedSpeedyCartSteps: CartSteps;
}>({
  checkoutSteps: async ({ page }, use) => {
    const steps = new CheckoutSteps(new CheckoutInfoPage(page), new CheckoutOverviewPage(page));
    await use(steps);
  },
  authSteps: async ({ page }, use) => {
    const authSteps = new AuthenticationSteps(new LoginPage(page));
    await use(authSteps);
  },
  cartSteps: async ({ page }, use) => {
    const cartSteps = new CartSteps(new CartPage(page), new InventoryPage(page));
    await use(cartSteps);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  authedContext: async ({ page }, use) => {
    await page.context().addCookies([
      {
        name: 'session-username',
        value: 'standard_user',
        domain: 'www.saucedemo.com',
        path: '/',
      },
    ]);
    await use(page);
  },
  loggedInPage: async ({ authedContext }, use) => {
    await authedContext.goto('/inventory.html');
    await use(authedContext);
  },
  speedyPage: async ({ authedContext }, use) => {
    await authedContext.context().route('**/*', (route) => {
      const url = route.request().url();
      const type = route.request().resourceType();

      if (type === 'image' || url.match(/\.(png|jpg|jpeg|svg)(\?.*)?$/)) {
        console.log(`Blocked image -> ${type} | URL: ${url}`);
        route.fulfill({
          status: 200,
          contentType: 'image/jpeg',
          body: '',
        });
      } else {
        route.continue();
      }
    });
    await authedContext.goto('/inventory.html', { waitUntil: 'domcontentloaded' });
    await use(authedContext);
  },
  authedCartSteps: async ({ loggedInPage }, use) => {
    const steps = new CartSteps(new CartPage(loggedInPage), new InventoryPage(loggedInPage));
    await use(steps);
  },
  authedSpeedyCartSteps: async ({ speedyPage }, use) => {
    const steps = new CartSteps(new CartPage(speedyPage), new InventoryPage(speedyPage));
    await use(steps);
  },
});

export { expect } from '@playwright/test';
