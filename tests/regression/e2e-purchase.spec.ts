import { test } from '../../fixtures/testFixtures';
import { UserFactory } from '../../data/factories/UserFactory';
import { CheckoutFactory } from '../../data/factories/CheckoutFactory';

// test('User is able to complete full purchase flow', async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const inventoryPage = new InventoryPage(page);
//   const cartPage = new CartPage(page);
//   const checkoutInfoPage = new CheckoutInfoPage(page);
//   const checkoutOverviewPage = new CheckoutOverviewPage(page);

//   await loginPage.goto();
//   await loginPage.login('standard_user', 'secret_sauce');

//   await inventoryPage.addFirstItemToCart();
//   await inventoryPage.expectCartCount(1);
//   await inventoryPage.goToCart();

//   await cartPage.expectItemsCount(1);
//   await cartPage.proceedToCheckout();

//   await checkoutInfoPage.fillInfo('Stefan', 'Slavov', '1000');
//   await checkoutInfoPage.continueToOverviewPage();

//   await checkoutOverviewPage.expectSummaryItemCount(1);
//   await checkoutOverviewPage.finishCheckOut();

//   await expect(page).toHaveURL(/checkout-complete/);
// });

test('User is able to complete full purchase flow new', async ({ steps }) => {
  const user = UserFactory.standardUser();
  const checkout = CheckoutFactory.validCheckout();

  await steps.completePurchase(user, checkout);
});
