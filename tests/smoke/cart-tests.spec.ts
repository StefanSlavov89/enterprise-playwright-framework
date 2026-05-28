import { UserFactory } from '../../data/factories/UserFactory';
import { test } from '../../fixtures/testFixtures';

test('@smoke User is able to add item to cart', async ({ authSteps, cartSteps }) => {
  const user = UserFactory.standardUser();

  await authSteps.loginAs(user);
  await cartSteps.addFirstItemToCart();
  await cartSteps.goToCart();
  await cartSteps.expectItemsCount(1);
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
