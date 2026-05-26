import { Page, Locator, expect } from '@playwright/test';

export class CheckoutInfoPage {
  public readonly page: Page;
  public readonly firstName: Locator;
  public readonly lastName: Locator;
  public readonly zipCode: Locator;
  public readonly continueButton: Locator;
  public readonly cancelButton: Locator;
  public readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.zipCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillInfo(firstName: string, lastName: string, zipCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zipCode.fill(zipCode);
  }

  async continueToOverviewPage() {
    await this.continueButton.click();
  }

  async expectError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async expectErrorText(text: string) {
    await expect(this.errorMessage).toHaveText(text);
  }
}
