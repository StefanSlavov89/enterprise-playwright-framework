import { Page } from '@playwright/test';

export async function injectSessionAndCart(page: Page, itemIds: number[]) {
  await page.context().addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
    },
  ]);

  await page.goto('/');

  await page.evaluate((ids) => {
    window.localStorage.setItem('cart-contents', JSON.stringify(ids));
  }, itemIds);
}
