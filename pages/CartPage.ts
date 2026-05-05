import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
  public readonly page: Page;
  public readonly cartItem: Locator;
  public readonly continueShoppingButton: Locator;
  public readonly checkOutButton: Locator;
  public readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItem = page.locator('.cart_item');
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.checkOutButton = page.getByRole('button', { name: 'Checkout' });
    this.removeButton = page.locator('button.cart_button');
  }

  async removeFirstItem() {
    await this.removeButton.first().click();
  }

  async proceedToCheckout() {
    await this.checkOutButton.click();
  }

  async expectItemsCount(count: number) {
    await expect(this.cartItem).toHaveCount(count);
  }
}
