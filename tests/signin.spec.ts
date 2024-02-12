import { test } from '@playwright/test';

test('signin', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.locator('button[name="signbtn"]').click();
  await page.getByTestId('signin-email-input').click();
  await page
    .getByTestId('signin-email-input')
    .fill('hurubrajuddoi-5145@yopmail.com');
  await page.getByTestId('signin-password-input').click();
  await page.getByTestId('signin-password-input').fill('azerty');
  await page.getByTestId('signin-okbtn').click();
  await page.waitForURL('http://localhost:8080/products');
});
