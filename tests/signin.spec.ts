import { test } from '@playwright/test';

const baseUrl = 'https://thomasdeparis.github.io/store-manager/#';

test('signin', async ({ page }) => {
  await page.goto(baseUrl);
  await page.locator('button[name="sign-btn"]').click();
  await page.getByTestId('signin-email-input').click();
  await page
    .getByTestId('signin-email-input')
    .fill('hurubrajuddoi-5145@yopmail.com');
  await page.getByTestId('signin-password-input').click();
  await page.getByTestId('signin-password-input').fill('azerty');
  await page.getByTestId('signin-okbtn').click();
  await page.waitForURL(`${baseUrl}/products`);
});
