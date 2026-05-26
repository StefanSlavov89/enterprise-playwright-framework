import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutSteps } from '../steps/CheckoutSteps';
import { AuthenticationSteps } from '../steps/AuthenticationSteps';

export const test = base.extend<{
  steps: CheckoutSteps;
  authSteps: AuthenticationSteps;
}>({
  steps: async ({ page }, use) => {
    const steps = new CheckoutSteps(
      new InventoryPage(page),
      new CartPage(page),
      new CheckoutInfoPage(page),
      new CheckoutOverviewPage(page),
    );
    await use(steps);
  },
  authSteps: async ({ page }, use) => {
    const authSteps = new AuthenticationSteps(new LoginPage(page));
    await use(authSteps);
  },
});

export { expect } from '@playwright/test';
