import { test } from '../../fixtures/testFixtures';
import { UserFactory } from '../../data/factories/UserFactory';
import { CheckoutFactory } from '../../data/factories/CheckoutFactory';

test('@regression User is able to complete full purchase flow new', async ({
  authSteps,
  checkoutSteps,
  cartSteps,
}) => {
  const user = UserFactory.standardUser();
  const checkout = CheckoutFactory.validCheckout();

  await authSteps.loginAs(user);
  await cartSteps.addFirstItemToCart();
  await cartSteps.goToCart();
  await cartSteps.goToCheckout();
  await checkoutSteps.fillCheckoutData(checkout);
  await checkoutSteps.submitCheckout();
  await checkoutSteps.finishCheckout();
});
