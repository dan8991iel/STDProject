import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/client/src/pages/books.html');
  await page.getByText('BeispielISBN: 978321456789Autoren: Nadja SchindlerVeröffentlicht: 2023').click();
  await page.getByRole('button', { name: 'Zurück zur Übersicht' }).click();
});