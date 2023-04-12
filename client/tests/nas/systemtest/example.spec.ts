import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});
test('search specific book', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/client/src/pages/books.html');

  const bookTitle = page.locator("tile h2").innerText();
  console.log("Titel: " + bookTitle);
  //await expect(page).toHaveTitle(/Playwright/);
});