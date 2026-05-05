import { Page, Locator, expect } from '@playwright/test';

export class CheckoutOverviewPage {
  public readonly page: Page;
  public readonly finishButton: Locator;
  public readonly cancelButton: Locator;
  public readonly summaryItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.summaryItem = page.locator('.cart_item');
  }

  async expectSummaryItemCount(count: number) {
    await expect(this.summaryItem).toHaveCount(count);
  }

  async finishCheckOut() {
    await this.finishButton.click();
  }
}
