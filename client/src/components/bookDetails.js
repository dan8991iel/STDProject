import { generateCitation } from '../modules/citation.js';

const queryParams = new URLSearchParams(window.location.search);
const bookId = queryParams.get('id');

const bookTitle = document.querySelector('.bookTitle');
const title = document.querySelector('.title');
const isbn = document.querySelector('.isbn');
const authors = document.querySelector('.authors');
const releaseYear = document.querySelector('.releaseYear');
const category = document.querySelector('.category');
const edition = document.querySelector('.edition');
const backButton = document.getElementById("back-button");
const citationButton = document.getElementById("citation-button");
const citationModal = document.getElementById("citation-modal");
const citationStyle = document.getElementById("citation-style");
const citationText = document.getElementById("citation-text");
const closeModal = document.getElementById("close-modal");



var book;

/*function generateCitation(style, book) {
  switch (style) {
    case "apa":
      return `${book.authors.join(', ')}. (${book.releaseYear}). ${book.title}. ${book.category}.`;
    case "mla":
      return `${book.authors.join(', ')}. ${book.title}. ${book.category}, ${book.releaseYear}.`;
    case "chicago":
      return `${book.authors.join(', ')}. ${book.title}. ${book.category}, ${book.releaseYear}.`;
    default:
      return "";
  }
}*/

fetch(`http://127.0.0.1:3000/books/${bookId}`, {method: "GET"})
  .then(response => response.json())
  .then(responseBook  => {
    book = responseBook ;
    bookTitle.textContent = book .title;
    title.textContent = book.title;
    isbn.textContent = book.isbn;
    let authorNames = '';
    for(let i = 0; i < book.authors.length; i++) {
      let author = book.authors[i];
      if(authorNames !== '') {
        authorNames = authorNames + ', ';
      }
      authorNames = authorNames + author.name.firstName + ' ' + author.name.surname;
    }
    authors.textContent = authorNames;
    releaseYear.textContent = book.releaseYear;
    category.textContent = book.category;
    edition.textContent = book.edition;
  });

  backButton.addEventListener("click", () => {
    window.location.href = "http://127.0.0.1:5500/client/src/pages/books.html";
  });
  
  citationButton.addEventListener("click", () => {
    citationModal.style.display = "block";
    citationText.value = generateCitation(citationStyle.value, book);
  });
  
  closeModal.addEventListener("click", () => {
    citationModal.style.display = "none";
  });
  
  citationStyle.addEventListener("change", () => {
    citationText.value = generateCitation(citationStyle.value, book);
  });

  document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(elems);
  });
