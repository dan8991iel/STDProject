import { displayAddBookForm } from './addBook.js';
import { displayEditBookForm, searchBook } from './editBook.js';
import { displayDeleteBook } from './deleteBook.js';

const content = document.getElementById('content');
const items = document.querySelectorAll('.collection-item');

const addBookElement = document.getElementById('addBook');
addBookElement.addEventListener('click', () => {
    displayAddBookForm(content);
    updateActiveItem(addBookElement);
});

const editBookElement = document.getElementById('editBook');
editBookElement.addEventListener('click', () => {
    displayEditBookForm(content);
    updateActiveItem(editBookElement);
});

const deleteBookElement = document.getElementById('deleteBook');
deleteBookElement.addEventListener('click', () => {
    displayDeleteBook(content);
    updateActiveItem(deleteBookElement);
});

displayAddBookForm(content);


function updateActiveItem(clickedItem) {
  items.forEach((item) => {
    if (item === clickedItem) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}