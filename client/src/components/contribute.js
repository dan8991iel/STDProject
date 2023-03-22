const content = document.getElementById('content');

function displayAddBookForm() {
    content.innerHTML = `
    <h3>Add a New Book</h3>
    <form id="addBookForm">
      <div class="input-field">
        <input id="title" type="text" required>
        <label for="title">Title</label>
      </div>
      <div class="input-field">
        <input id="isbn" type="text" required>
        <label for="isbn">ISBN</label>
      </div>
      <div class="input-field">
        <input id="authors" type="text" required>
        <label for="authors">Authors (comma-separated)</label>
      </div>
      <div class="input-field">
        <input id="releaseYear" type="number" required>
        <label for="releaseYear">Release Year</label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">Submit</button>
    </form>
    `;
    document.getElementById('addBookForm').addEventListener('submit', submitAddBookForm);
}

function displayEditBookForm(book) {
    const editBookFormContainer = document.getElementById('editBookFormContainer');
    editBookFormContainer.innerHTML = `
    <h4>Edit Book Details</h4>
    <form id="editBookForm">
      <input type="hidden" id="bookId" value="${book._id}">
      <div class="input-field">
        <input id="editTitle" type="text" value="${book.title}" required>
        <label for="editTitle">Title</label>
      </div>
      <div class="input-field">
        <input id="editIsbn" type="text" value="${book.isbn}" required>
        <label for="editIsbn">ISBN</label>
      </div>
      <div class="input-field">
        <input id="editAuthors" type="text" value="${book.authors.join(', ')}" required>
        <label for="editAuthors">Authors (comma-separated)</label>
      </div>
      <div class="input-field">
        <input id="editReleaseYear" type="number" value="${book.releaseYear}" required>
        <label for="editReleaseYear">Release Year</label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">Save Changes</button>
    </form>
  `;

    document.getElementById('editBookForm').addEventListener('submit', submitEditBookForm);
}

function submitAddBookForm(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const isbn = document.getElementById('isbn').value;
    const authors = document.getElementById('authors').value.split(',').map(author => author.trim());
    const releaseYear = document.getElementById('releaseYear').value;

    const bookData = {
        title,
        isbn,
        authors,
        releaseYear
    };

    fetch('http://127.0.0.1:3000/books', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData)
    })
        .then(response => response.json())
        .then(data => {
            alert('Book added successfully');
            document.getElementById('addBookForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function submitEditBookForm(event) {
    event.preventDefault();

    const bookId = document.getElementById('bookId').value;
    const title = document.getElementById('editTitle').value;
    const isbn = document.getElementById('editIsbn').value;
    const authors = document.getElementById('editAuthors').value.split(',').map(author => author.trim());
    const releaseYear = document.getElementById('editReleaseYear').value;

    const bookData = {
        title,
        isbn,
        authors,
        releaseYear
    };

    fetch(`http://127.0.0.1:3000/books/${bookId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData)
    })
        .then(response => response.json())
        .then(data => {
            alert('Book details updated successfully');
        })
        .catch(error => { console.error('Error:', error); });
}

function displayEditBookForm(book) {
    const editBookFormContainer = document.getElementById('editBookFormContainer');
    editBookFormContainer.innerHTML = `
    <h4>Edit Book Details</h4>
    <form id="editBookForm">
      <input type="hidden" id="bookId" value="${book._id}">
      <div class="input-field">
        <input id="editTitle" type="text" value="${book.title}" required>
        <label for="editTitle">Title</label>
      </div>
      <div class="input-field">
        <input id="editIsbn" type="text" value="${book.isbn}" required>
        <label for="editIsbn">ISBN</label>
      </div>
      <div class="input-field">
        <input id="editAuthors" type="text" value="${book.authors.join(', ')}" required>
        <label for="editAuthors">Authors (comma-separated)</label>
      </div>
      <div class="input-field">
        <input id="editReleaseYear" type="number" value="${book.releaseYear}" required>
        <label for="editReleaseYear">Release Year</label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">Save Changes</button>
    </form>
  `;

    document.getElementById('editBookForm').addEventListener('submit', submitEditBookForm);
}

function searchBook() {
    const isbn = document.getElementById('searchIsbn').value;

    fetch(`http://127.0.0.1:3000/books?isbn=${isbn}`, {
        method: "GET"
    })
        .then(response => response.json())
        .then(books => {
            if (books.length === 0) {
                alert('No book found with the given ISBN');
                return;
            }

            const book = books[0];
            displayEditBookForm(book);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayDeleteBook() {
    content.innerHTML = `
      <h3>Delete a Book</h3>
      <div class="input-field">
        <input id="deleteIsbn" type="text" required>
        <label for="deleteIsbn">Search by ISBN</label>
      </div>
      <button class="btn waves-effect waves-light red" id="deleteBtn">Delete</button>
    `;

    document.getElementById('deleteBtn').addEventListener('click', deleteBook);
}

function deleteBook() {
    const isbn = document.getElementById('deleteIsbn').value;

    fetch(`http://127.0.0.1:3000/books?isbn=${isbn}`, {
        method: "GET"
    })
        .then(response => response.json())
        .then(books => {
            if (books.length === 0) {
                alert('No book found with the given ISBN');
                return;
            }

            const book = books[0];
            const confirmation = confirm(`Are you sure you want to delete "${book.title}"?`);

            if (confirmation) {
                fetch(`http://127.0.0.1:3000/books/${book._id}`, {
                    method: "DELETE"
                })
                    .then(response => {
                        if (response.ok) {
                            alert('Book deleted successfully');
                            document.getElementById('deleteIsbn').value = '';
                        } else {
                            throw new Error('Failed to delete the book');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.getElementById('addBook').addEventListener('click', () => {
    displayAddBookForm();
});

document.getElementById('editBook').addEventListener('click', () => {
    displayEditBook();
});

document.getElementById('deleteBook').addEventListener('click', () => {
    displayDeleteBook();
});

displayAddBookForm(); // Display the "Add a New Book" form by default





