import { test, expect } from '@playwright/test';
import { sampleBook } from '../util/sampleBook.js';

import { app, start, clearDatabase } from '../../../../server/server';
import http from 'http';

const pageURL = `http://127.0.0.1:5500/client/src/pages/books.html`;
const testPort = 3000;


test.describe('Add book form', () => {
  let server;

  test.beforeAll(async () => {
    await start({ useTestDB: true, port: testPort });
    server = http.createServer(app);
  });

  test.afterAll(async () => {
    await server.close();
  });
  
  test.beforeEach(async ({ page }) => {
    await page.goto(pageURL);
  });

  test.afterEach(async () => {
    await clearDatabase();
  });

  test('should submit a sample book and display the correct popup', async ({ page }) => {
    await page.getByRole('link', { name: 'Contribute' }).click();
    await page.fill('#title', sampleBook.title);
    await page.fill('#subtitle', sampleBook.subtitle);
    await page.fill('#isbn', sampleBook.isbn);
    await page.fill('#authorFirstName-1', sampleBook.authors[0].name.firstName);
    await page.fill('#authorLastName-1', sampleBook.authors[0].name.surname);
    await page.fill('#releaseYear', sampleBook.releaseYear.toString());
    await page.fill('#edition', parseInt(sampleBook.edition).toString());
    await page.fill('#publisher', sampleBook.publisher);

    await Promise.all([
      page.waitForSelector('.popup-content'),
      page.click('button[type="submit"]'),
    ]);

    const popupContent = await page.$eval('.popup-content', (el) => el.textContent);
    const expectedPopupMessage = `Das Buch ${sampleBook.title}${sampleBook.subtitle ? ': ' + sampleBook.subtitle : ''} wurde erfolgreich hinzugefügt!OK`;
    expect(popupContent).toEqual(expectedPopupMessage);

    await page.click('.ok-button');
  });
});