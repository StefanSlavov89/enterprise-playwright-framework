import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  public readonly page: Page;
  public readonly cartItemCounter: Locator;
  public readonly cartLink: Locator;
  public readonly addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemCounter = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async addProductByIndex(index: number) {
    await this.addToCartButton.nth(index).click();
  }

  async addFirstItemToCart() {
    await this.addToCartButton.first().click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartItemCounter).toHaveText(String(count));
  }
}
