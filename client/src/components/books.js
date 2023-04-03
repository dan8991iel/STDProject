(async () => {
  const search = document.getElementById('search-input');
  const tilegrid = document.querySelector('.tilegrid');
  const clearSearchButton = document.getElementById('clear-search-input');

  search.addEventListener('input', debounce(() => {
    submitted(search.value);
  }, 300));
  
  clearSearchButton.addEventListener('click', () => clearSearchInput(search));

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  async function submitted(searchText) {
    try {
      const books = await fetchBooks();
      searchText = searchText ? searchText.trim() : searchText;
      const filteredBooks = searchText ? filterBooks(books, searchText) : books;
      renderBooks(filteredBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
      // Display an error message or handle the error accordingly
    }
  }

  async function fetchBooks() {
    const response = await fetch('http://127.0.0.1:3000/books', { method: "GET" });
    return response.json();
  }

  function filterBooks(books, searchText) {
    return books.filter(book => book.title.toLowerCase().includes(searchText.toLowerCase()));
  }

  function renderBooks(books) {
    emptyTileGrid();
    for (let book of books) {
      const tile = createBookTile(book);
      tilegrid.appendChild(tile);
    }
  }

  function emptyTileGrid() {
    while (tilegrid.lastElementChild) {
      tilegrid.removeChild(tilegrid.lastElementChild);
    }
  }

  function createBookTile(book) {
    const tile = document.createElement('div');
    tile.classList.add('tile');

    const title = document.createElement('h2');
    title.textContent = book.title;
    tile.appendChild(title);

    const isbn = document.createElement('p');
    isbn.textContent = 'ISBN: ' + book.isbn;
    tile.appendChild(isbn);

    const authors = document.createElement('p');
    const authorNames = book.authors.map(author => `${author.name.firstName} ${author.name.surname}`).join(', ');
    authors.textContent = 'Autoren: ' + authorNames;
    tile.appendChild(authors);

    const releaseYear = document.createElement('p');
    releaseYear.textContent = 'Veröffentlicht: ' + book.releaseYear;
    tile.appendChild(releaseYear);

    tile.addEventListener('click', () => {
      window.location.href = `${window.location.protocol}//${window.location.hostname}:5500/client/src/pages/bookDetails.html?id=${book._id}`;
    });

    return tile;
  }

  function clearSearchInput(inputElement) {
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input')); // Trigger a search event to update the displayed book tiles
  }

  await submitted(); // Fetch and display all books on initial page load
})();