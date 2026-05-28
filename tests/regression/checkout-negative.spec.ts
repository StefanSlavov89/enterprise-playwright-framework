import { test } from '../../fixtures/testFixtures';
import { UserFactory } from '../../data/factories/UserFactory';
import { CheckoutFactory } from '../../data/factories/CheckoutFactory';
import { CheckoutInfoPage } from '../../pages/CheckoutInfoPage';

test('@regression Should show error when first name is missing', async ({
  authSteps,
  checkoutSteps,
  page,
  cartSteps,
}) => {
  const checkoutInfoPage = new CheckoutInfoPage(page);
  const user = UserFactory.standardUser();
  const checkout = CheckoutFactory.missingFirstName();

  await authSteps.loginAs(user);
  await cartSteps.addFirstItemToCart();
  await cartSteps.goToCart();
  await cartSteps.goToCheckout();
  await checkoutSteps.fillCheckoutData(checkout);
  await checkoutSteps.submitCheckout();

  checkoutInfoPage.expectError();
});
