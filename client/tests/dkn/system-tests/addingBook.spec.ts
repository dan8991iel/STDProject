import { test, expect } from '@playwright/test';
import { sampleBook } from '../util/sampleBook.js';


const {  app, start, clearDatabase  } = require('../../../../server/server');
const http = require('http');

const pageURL = `http://127.0.0.1:5500/client/src/pages/books.html`;
const testPort = 3000;


test.describe('Add book form', () => {
  let server;

  test.beforeAll(async ({ page }) => {
    await start({ useTestDB: true, port: testPort });
    server = http.createServer(app);
  });

  test.afterAll(async ({ page }) => {
    await server.close();
  });
  
  test.beforeEach(async ({ page }) => {
    await page.goto(pageURL);
  });

  test.afterEach(async ({ page }) => {
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

/*
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

  
});*/