import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  public readonly page: Page;
  public readonly usernameField: Locator;
  public readonly passwordField: Locator;
  public readonly loginButton: Locator;
  public readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator('#user-name');
    this.passwordField = page.locator('#password');
    this.loginButton = page.locator('#login-button');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
    await this.usernameField.fill(user);
    await this.passwordField.fill(pass);
    await this.loginButton.click();
  }

  async expectError() {
    await expect(this.errorMessage).toBeVisible();
  }
}
