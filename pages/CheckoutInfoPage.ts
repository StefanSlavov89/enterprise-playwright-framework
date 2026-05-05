import { Page, Locator } from '@playwright/test';

export class CheckoutInfoPage {
  public readonly page: Page;
  public readonly firstName: Locator;
  public readonly lastName: Locator;
  public readonly zipCode: Locator;
  public readonly continueButton: Locator;
  public readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.zipCode = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async fillInfo(firstName: string, lastName: string, zipCode: string) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.zipCode.fill(zipCode);
  }

  async continueToOverviewPage() {
    await this.continueButton.click();
  }
}
