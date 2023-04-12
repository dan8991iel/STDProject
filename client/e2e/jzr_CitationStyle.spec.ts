import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/client/src/pages/books.html');
  await page.getByText('BeispielISBN: 978321456789Autoren: Nadja SchindlerVeröffentlicht: 2023').click();
  await page.getByRole('button', { name: 'Generate Citation' }).click();
  
  let previousCitation = (await page.locator('#citation-text').innerText()).toString();

  //await page.waitForTimeout(3000);

  await page.locator('input[type="text"]').click();
  await page.getByRole('list').getByText('MLA').click();
  //await page.waitForTimeout(3000);
  let currentCitation = (await page.locator('#citation-text').innerText()).toString();
  expect(currentCitation).not.toEqual(previousCitation);
  previousCitation = currentCitation;

  //await page.waitForTimeout(1500);
  await page.locator('input[type="text"]').click();
  await page.getByRole('list').getByText('Chicago').click();
  currentCitation = (await page.locator('#citation-text').innerText()).toString();
  expect(currentCitation).not.toEqual(previousCitation);
  previousCitation = currentCitation;

  //await page.waitForTimeout(1500);
  await page.locator('input[type="text"]').click();
  await page.getByRole('list').getByText('APA').click();
  currentCitation = (await page.locator('#citation-text').innerText()).toString();
  expect(currentCitation).not.toEqual(previousCitation);
  previousCitation = currentCitation;

  //await page.waitForTimeout(1500);
});