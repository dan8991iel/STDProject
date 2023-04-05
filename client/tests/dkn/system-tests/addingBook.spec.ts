import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/client/src/pages/books.html');
  await page.getByRole('link', { name: 'Contribute' }).click();

  await page.getByPlaceholder('Example: The Catcher in the Rye').fill('Sample Title');


  await page.getByPlaceholder('Example: A Novel').fill('Sample Subtitle');

  await page.getByPlaceholder('Example: 9780316769488').fill('1234567891011');

  await page.getByPlaceholder('Example: John').fill('John');

  await page.getByPlaceholder('Example: Doe').fill('Doe');

  await page.getByPlaceholder('Example: 1951').fill('2022');

  await page.getByPlaceholder('Example: 1, 2, 3, 4, ...').fill('2');

  await page.getByPlaceholder('Example: Little, Brown and Company').fill('Sample Publisher');

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });

  await page.getByRole('button', { name: 'Submit' }).click();

  
});