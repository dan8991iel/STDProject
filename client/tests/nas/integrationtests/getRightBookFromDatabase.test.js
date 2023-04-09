import bookDetails from './editBook';
import {describe, expect, test} from '@jest/globals';

const bookData = {
    title:"Testbuch",
    subtitle:"Zweiter Titel",
    isbn: "1234567890",
    authors: ["Nadja", "Schindler"],
    releaseYear: parseInt(2023, 10),
    edition: "1st",
    publisher: "FHDW",
};
console.log(bookData);
console.log(JSON.stringify(bookData));

try {
    const response = await fetch('http://127.0.0.1:3000/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
} catch (error) {
}

describe('get book details', () => {
    test('add a new book, choose ist in dropdown menu and show if the details match', () => {
        const book = bookDetails("Testbuch");
        expect(book.title).toBe("Testbuch");
        expect(book.subtitle).toBe("Zweiter Titel");
        expect(book.isbn).toBe("1234567890");
        expect(book.authors.firstname).toBe("Nadja");
        expect(book.authors.surname).toBe("Schindler");
        expect(book.releaseYear).toBe("2023");
        expect(book.edition).toBe("1st");
        expect(book.publisher).toBe("FHDW");
    });
  });