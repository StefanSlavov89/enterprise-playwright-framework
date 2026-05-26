import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutData } from '../data/models/CheckoutData';

export class CheckoutSteps {
  constructor(
    private inventoryPage: InventoryPage,
    private cartPage: CartPage,
    private checkoutInfoPage: CheckoutInfoPage,
    private checkoutOverviewPage: CheckoutOverviewPage,
  ) {}

  async addFirstItemToCart() {
    await this.inventoryPage.addFirstItemToCart();
  }

  async goToCheckout() {
    await this.inventoryPage.goToCart();
    await this.cartPage.proceedToCheckout();
  }

  async fillCheckoutData(data: CheckoutData) {
    await this.checkoutInfoPage.fillInfo(data.firstName, data.lastName, data.postalCode);
  }

  async submitCheckout() {
    await this.checkoutInfoPage.continueToOverviewPage();
  }

  async finishCheckout() {
    await this.checkoutOverviewPage.finishCheckOut();
  }
}
