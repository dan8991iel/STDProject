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

fetch(`http://127.0.0.1:3000/books/${bookId}`, {method: "GET"})
  .then(response => response.json())
  .then(book => {
    bookTitle.textContent = book.title;
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
