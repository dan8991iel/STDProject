import { test, expect } from '@playwright/test';

const LOCATOR_BOOK_TITLE = ".tile h2";
const SEARCH_FIELD = "#search-input";
const DELETE_SEARCH_FIELD_INPUT = "#clear-search-input"
const URL = "http://127.0.0.1:5500/client/src/pages/books.html";

const TESTRUNS = 2

test.describe('search specific book', () => {
    test('Open books.html, get the title from the first ' + TESTRUNS + ' books, write this title in the searchfield, get the title of the book, which appears and check if the titles are equal', async ({
        page,
    }) => {
        await page.goto(URL);
        for(let i = 0; i < TESTRUNS; i++){
            const bookTitle = (await page.locator(LOCATOR_BOOK_TITLE).nth(i).innerText()).toString();

            await expect(page.locator(SEARCH_FIELD)).toBeVisible({ timeout: 2000 });

            await page.fill(SEARCH_FIELD, bookTitle);
            await page.waitForTimeout(500);

            const searchedBookTitle = (await page.locator(LOCATOR_BOOK_TITLE).nth(0).innerText()).toString();
            expect(bookTitle).toEqual(searchedBookTitle);
            await page.locator(DELETE_SEARCH_FIELD_INPUT).click();
        }
    })
});