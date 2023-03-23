submitted = require("../data/books.js")
var searchbutton = require("../data/books.js")
const result = require ("../data/books.js")

const rootContainer = "";

const arrayExistingTestData = ["Pro", 2, "Test", 1, "Pro RESTful APIs", 2]
const arrayNotExistingTestData = ["Testtitel", 1, "Pro RESTlul APIs"]

// beforeEach(() => {
//   rootContainer = document.createElement("div");
//   document.body.appendChild(rootContainer);
//   document.getElementById('searchId') = "Pro";
// });

afterEach(() => {
  document.body.removeChild(rootContainer);
  rootContainer = null;
});

for(let i = 0; i < 2; i++){

  describe('filter after books with existing title', () => {
    it('string that includes a part of an booktitle', () => {
        //const partOfBooktitle = "Pro";
        //let expectedBook = "Pro RESTful APIs";
        //const expectedNumberOfBooks = 2

        searchbutton.submitted(arrayExistingTestData[i])
        //const f = 'form';
        //f.addEventListener('submit', submitted);
        //searchbutton.submitted();

        //const h2 = rootContainer.querySelector("h2");

        expect(result).to.equal(arrayExistingTestData[i+1]);
      });
  });

  describe('filter after books with not existing title', () => {
    it('string that includes no part of an booktitle', () => {
      //const partOfBooktitle = "Testtitel";
      //let expectedBook = "Pro RESTful APIs";
      //const expectedNumberOfBooks = 0

      searchbutton.submitted(arrayNotExistingTestData[i])
      //const f = 'form';
      //f.addEventListener('submit', submitted);
      //searchbutton.submitted();

      //const h2 = rootContainer.querySelector("h2");

      expect(result).to.equal(0);
    });
  });
}
