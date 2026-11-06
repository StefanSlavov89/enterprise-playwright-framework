import { test, expect } from '../../fixtures/testFixtures';
import { injectSessionAndCart } from '../../utils/stateInjector';
import { CheckoutFactory } from '../../data/factories/CheckoutFactory';

test('Fast checkout with state injecting', async ({ page, checkoutSteps, cartSteps }) => {
  const data = CheckoutFactory.validCheckout();

  await injectSessionAndCart(page, [0, 1, 4]);
  await page.goto('/checkout-step-one.html');

  await cartSteps.expectCartBadgeCount(3);

  await checkoutSteps.fillCheckoutData(data);
  await checkoutSteps.submitCheckout();
  await checkoutSteps.finishCheckout();

  await expect(page).toHaveURL(/checkout-complete/);
});
