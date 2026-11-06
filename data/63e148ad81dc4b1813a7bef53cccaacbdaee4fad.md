# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: checkout/e2e-purchase.spec.ts >> @smoke User is able to complete full purchase flow with 2 items
- Location: tests/checkout/e2e-purchase.spec.ts:33:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('.cart_item')
Expected: 2
Received: 0

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('.cart_item')
    3 × locator resolved to 0 elements
      - unexpected value "0"

```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | 
  3  | export class CartPage {
  4  |   public readonly page: Page;
  5  |   public readonly cartItem: Locator;
  6  |   public readonly continueShoppingButton: Locator;
  7  |   public readonly checkOutButton: Locator;
  8  |   public readonly removeButton: Locator;
  9  | 
  10 |   constructor(page: Page) {
  11 |     this.page = page;
  12 |     this.cartItem = page.locator('.cart_item');
  13 |     this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
  14 |     this.checkOutButton = page.getByRole('button', { name: 'Checkout' });
  15 |     this.removeButton = page.locator('button.cart_button');
  16 |   }
  17 | 
  18 |   async removeFirstItem() {
  19 |     await this.removeButton.first().click();
  20 |   }
  21 | 
  22 |   async proceedToCheckout() {
  23 |     await this.checkOutButton.click();
  24 |   }
  25 | 
  26 |   async expectItemsCount(count: number) {
> 27 |     await expect(this.cartItem).toHaveCount(count);
     |                                 ^ Error: expect(locator).toHaveCount(expected) failed
  28 |   }
  29 | }
  30 | 
```