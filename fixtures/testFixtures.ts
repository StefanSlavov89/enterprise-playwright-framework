import { test as base } from '@playwright/test';
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
});

export { expect } from '@playwright/test';
