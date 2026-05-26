import { test } from '../../fixtures/testFixtures';
import { UserFactory } from '../../data/factories/UserFactory';
import { CheckoutFactory } from '../../data/factories/CheckoutFactory';
import { CheckoutInfoPage } from '../../pages/CheckoutInfoPage';

test('@regression Should show error when first name is missing', async ({
  authSteps,
  steps,
  page,
}) => {
  const checkoutInfoPage = new CheckoutInfoPage(page);
  const user = UserFactory.standardUser();
  const checkout = CheckoutFactory.missingFirstName();

  await authSteps.loginAs(user);
  await steps.addFirstItemToCart();
  await steps.goToCheckout();
  await steps.fillCheckoutData(checkout);
  await steps.submitCheckout();

  checkoutInfoPage.expectError();
});
