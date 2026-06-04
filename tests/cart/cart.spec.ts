import { UserFactory } from '../../data/factories/UserFactory';
import { test } from '../../fixtures/testFixtures';

// test is isolated from login to be able to test item adding separately from authentication
test('@smoke User is able to add item to cart', async ({ authedCartSteps }) => {
  await authedCartSteps.addFirstItemToCart();
  await authedCartSteps.goToCart();
  await authedCartSteps.expectItemsCount(1);
});

test('@regression User is able to add item to cart without showing any product images', async ({
  authedSpeedyCartSteps,
}) => {
  await authedSpeedyCartSteps.addFirstItemToCart();
  await authedSpeedyCartSteps.goToCart();
  await authedSpeedyCartSteps.expectItemsCount(1);
});

test('@regression User is able to remove item from cart', async ({
  authSteps,
  cartSteps,
  cartPage,
}) => {
  const user = UserFactory.standardUser();

  await authSteps.loginAs(user);
  await cartSteps.addFirstItemToCart();
  await cartSteps.goToCart();
  await cartPage.removeFirstItem();
  await cartPage.expectItemsCount(0);
});
