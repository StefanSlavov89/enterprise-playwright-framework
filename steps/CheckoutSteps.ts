import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

import { User } from '../data/models/User';
import { CheckoutData } from '../data/models/CheckoutData';

export class CheckoutSteps {
  constructor(
    private loginPage: LoginPage,
    private inventoryPage: InventoryPage,
    private cartPage: CartPage,
    private checkoutInfoPage: CheckoutInfoPage,
    private checkoutOverviewPage: CheckoutOverviewPage,
  ) {}

  async completePurchase(user: User, checkoutData: CheckoutData) {
    await this.loginPage.goto();
    await this.loginPage.login(user.username, user.password);

    await this.inventoryPage.addFirstItemToCart();
    await this.inventoryPage.goToCart();

    await this.cartPage.proceedToCheckout();

    await this.checkoutInfoPage.fillInfo(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode,
    );

    await this.checkoutInfoPage.continueToOverviewPage();

    await this.checkoutOverviewPage.finishCheckOut();
  }
}
