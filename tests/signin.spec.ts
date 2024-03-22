import { test, expect, Page } from '@playwright/test';

const baseUrl = 'https://thomasdeparis.github.io/store-manager/#';

const delay = (milliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

const SignIn = async (page: Page, login: string, pwd: string) => {
  await page.goto(baseUrl);
  await page.locator('button[name="sign-btn"]').click();
  await page.getByTestId('signin-email-input').click();
  await page.getByTestId('signin-email-input').fill(login);
  await page.getByTestId('signin-password-input').click();
  await page.getByTestId('signin-password-input').fill(pwd);
  await page.getByTestId('signin-okbtn').click();
  await page.waitForURL(`${baseUrl}/products`);
};

const EditExistingTestProduct = async (page: Page) => {
  await page.goto(`${baseUrl}/products`);

  await page.getByTestId('searchproductinput').click();
  await page.getByTestId('searchproductinput').fill('test-playwright');
  await expect(
    page.locator('.q-table__bottom-item', { hasText: '1-1 of 1' })
  ).toBeVisible();

  await page.getByTestId('editproductbtn').click();

  const providerRef = await page.getByTestId('providerrefinput').inputValue();
  const ref = await page.getByTestId('referenceinput').inputValue();
  const name = await page.getByTestId('nameinput').inputValue();
  const sellPrice = Number(
    await page.getByTestId('sellpriceinput').inputValue()
  );

  //edit product
  await page.getByTestId('nameinput').fill(`${name}123`);
  await page.getByTestId('sellpriceinput').fill((sellPrice + 10.0).toString());
  await page.getByTestId('modifybtn').click();

  // expect values in grid
  await expect(page.getByRole('cell', { name: `${name}123` })).toBeVisible();
  await expect(
    page.getByRole('cell', { name: (sellPrice + 10.0).toString() })
  ).toBeVisible();

  await page.getByTestId('editproductbtn').click();
  //edit product back to origin
  await page.getByTestId('nameinput').fill(`${name}`);
  await page.getByTestId('sellpriceinput').fill(`${sellPrice}`);
  await page.getByTestId('modifybtn').click();

  await delay(1000);
  await page.getByTestId('detailproductbtn').click();

  await expect(page.getByText('Détail produit')).toBeVisible();
  await expect(page.getByTestId('providerrefinput')).toHaveValue(providerRef);
  await expect(page.getByTestId('referenceinput')).toHaveValue(ref);
  await expect(page.getByTestId('nameinput')).toHaveValue(name);
  await expect(page.getByTestId('sellpriceinput')).toHaveValue(
    sellPrice.toString()
  );
};

test('signin', async ({ page }) => {
  await SignIn(page, 'hurubrajuddoi-5145@yopmail.com', 'azerty');
});

test('edit-product', async ({ page }) => {
  await SignIn(page, 'hurubrajuddoi-5145@yopmail.com', 'azerty');
  await EditExistingTestProduct(page);
});
