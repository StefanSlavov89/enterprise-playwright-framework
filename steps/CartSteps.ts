import { CartPage } from '../pages/CartPage';
import { InventoryPage } from '../pages/InventoryPage';

export class CartSteps {
  constructor(
    private cartPage: CartPage,
    private inventoryPage: InventoryPage,
  ) {}

  async addFirstItemToCart() {
    await this.inventoryPage.addFirstItemToCart();
  }

  async goToCart() {
    await this.inventoryPage.goToCart();
  }

  async goToCheckout() {
    await this.cartPage.proceedToCheckout();
  }
}
