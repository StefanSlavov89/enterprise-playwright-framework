import { expect, test } from '../../fixtures/testFixtures';
import { UserFactory } from '../../data/factories/UserFactory';
import { CheckoutFactory } from '../../data/factories/CheckoutFactory';

test('@smoke User is able to complete full purchase flow with 1 item', async ({
  authSteps,
  checkoutSteps,
  cartSteps,
  page,
}) => {
  const user = UserFactory.standardUser();
  const checkout = CheckoutFactory.validCheckout();

  await test.step('Log in as standard user', async () => {
    await authSteps.loginAs(user);
  });

  await test.step('Add item and proceed to checkout', async () => {
    await cartSteps.addFirstItemToCart();
    await cartSteps.goToCart();
    await cartSteps.goToCheckout();
  });

  await test.step('Complete checkout', async () => {
    await checkoutSteps.fillCheckoutData(checkout);
    await checkoutSteps.submitCheckout();
    await checkoutSteps.finishCheckout();
  });

  await expect(page).toHaveURL(/checkout-complete/);
});

test('@smoke User is able to complete full purchase flow with 2 items', async ({
  authSteps,
  checkoutSteps,
  cartSteps,
  page,
}) => {
  const user = UserFactory.standardUser();
  const checkout = CheckoutFactory.validCheckout();

  await authSteps.loginAs(user);
  await cartSteps.addProductByIndex(0);
  await cartSteps.addProductByIndex(1);
  await cartSteps.goToCart();

  cartSteps.expectItemsCount(2);

  await cartSteps.goToCheckout();
  await checkoutSteps.fillCheckoutData(checkout);
  await checkoutSteps.submitCheckout();
  await checkoutSteps.finishCheckout();

  await expect(page).toHaveURL(/checkout-complete/);
});
