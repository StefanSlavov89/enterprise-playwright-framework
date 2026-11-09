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
  const { data, expectedError } = CheckoutFactory.missingFirstName();

  await authSteps.loginAs(user);
  await cartSteps.addFirstItemToCart();
  await cartSteps.goToCart();
  await cartSteps.goToCheckout();
  await checkoutSteps.fillCheckoutData(data);
  await checkoutSteps.submitCheckout();

  await checkoutInfoPage.expectErrorText(expectedError);
});

test('@regression Should show error when last name is missing', async ({
  authSteps,
  cartSteps,
  page,
  checkoutSteps,
}) => {
  const checkoutInfoPage = new CheckoutInfoPage(page);
  const user = UserFactory.standardUser();
  const { data, expectedError } = CheckoutFactory.missingLastName();

  await authSteps.loginAs(user);
  await cartSteps.addFirstItemToCart();
  await cartSteps.goToCart();
  await cartSteps.goToCheckout();
  await checkoutSteps.fillCheckoutData(data);
  await checkoutSteps.submitCheckout();

  await checkoutInfoPage.expectErrorText(expectedError);
});

test('@regression Should show error when missing postal code', async ({
  authSteps,
  cartSteps,
  page,
  checkoutSteps,
}) => {
  const checkoutInfoPage = new CheckoutInfoPage(page);
  const user = UserFactory.standardUser();
  const { data, expectedError } = CheckoutFactory.missingPostalCode();

  await authSteps.loginAs(user);
  await cartSteps.addFirstItemToCart();
  await cartSteps.goToCart();
  await cartSteps.goToCheckout();
  await checkoutSteps.fillCheckoutData(data);
  await checkoutSteps.submitCheckout();

  await checkoutInfoPage.expectErrorText(expectedError);
});

// User can actually finish the checkout process with an empty cart lol ...
test.fixme('@regression User is unable to complete checkout with empty cart', async ({
  authSteps,
  cartSteps,
  page,
  checkoutSteps,
}) => {
  const checkoutInfoPage = new CheckoutInfoPage(page);
  const user = UserFactory.standardUser();
  const checkout = CheckoutFactory.validCheckout();

  await authSteps.loginAs(user);
  await cartSteps.goToCart();
  await cartSteps.goToCheckout();
  await checkoutSteps.fillCheckoutData(checkout);
  await checkoutSteps.submitCheckout();

  await checkoutInfoPage.expectError();
});
