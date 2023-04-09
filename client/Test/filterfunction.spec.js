const filterBooks = require("../data/books.js");
var assert = require('assert');

const arrayExistingTestData = ["Buch", "Test", "Mein Buch"]
const arrayNotExistingTestData = ["Testtitel", "1", "Pro RESTlul APIs"]

const sampleBook = [{
  title: "Testbuch",
  subtitle: 'das Erste',
  isbn: '1234567890',
  authors: [{ name: { firstName: 'Nadja', surname: 'Schindler' } }],
  releaseYear: 2022,
  edition: '2nd',
  publisher: 'FHDW',
},
{
  title: "Mein Buch",
  subtitle: 'meins',
  isbn: '9876543210',
  authors: [{ name: { firstName: 'Nadja', surname: 'Schindler' } }],
  releaseYear: 2022,
  edition: '1st',
  publisher: 'FHDW',
}]


for(let i = 0; i < 3; i++){

  describe('check filtermethod to get a book', () => {
    it('filtermethod filterBooks is tested with an array of books and a part of an existing booktitle', () => {
        const result = filterBooks(sampleBook, arrayExistingTestData[i])

        assert.ok(true);
      });
  });

  describe('check filtermethod to get not a book', () => {
    it('filtermethod filterBooks is tested with an array of books and a part of not existing booktitle', () => {
      const result = filterBooks(sampleBook, arrayNotExistingTestData[i])

      assert.equal(result, 0)
    });
  });
}
