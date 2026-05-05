import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutSteps } from '../steps/CheckoutSteps';

export const test = base.extend<{
  steps: CheckoutSteps;
}>({
  steps: async ({ page }, use) => {
    const steps = new CheckoutSteps(
      new LoginPage(page),
      new InventoryPage(page),
      new CartPage(page),
      new CheckoutInfoPage(page),
      new CheckoutOverviewPage(page),
    );

    await use(steps);
  },
});

export { expect } from '@playwright/test';
