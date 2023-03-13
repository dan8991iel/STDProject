const tilegrid = document.querySelector('.tilegrid');

fetch('http://127.0.0.1:3000/books',{method:"GET"})
  .then(response => response.json())
  .then(books => {
    for (let book of books) {
      const tile = document.createElement('div');
      tile.classList.add('tile');

      const title = document.createElement('h2');
      title.textContent = book.title;
      tile.appendChild(title);

      const isbn = document.createElement('p');
      isbn.textContent = 'ISBN: ' + book.isbn;
      tile.appendChild(isbn);

      const authors = document.createElement('p');
      //authors.textContent = 'Authors: ' + book.authors.join(', ');
      let authorNames = '';
      for(let i = 0; i < book.authors.length; i++) {
        let author = book.authors[i];
        if(authorNames !== '') {
          authorNames = authorNames + ', ';
        }
        authorNames = authorNames + author.name.firstName + ' ' + author.name.surname;
      }
      authors.textContent = 'Autoren: ' + authorNames;
      tile.appendChild(authors);

      const releaseYear = document.createElement('p');
      releaseYear.textContent = 'Veröffentlicht: ' + book.releaseYear;
      tile.appendChild(releaseYear);

      tile.addEventListener('click', () => {
        window.location.href = window.location.protocol + "//" + window.location.hostname + ":5500"+`/client/src/pages/bookDetails.html?id=${book._id}`
      });

      tilegrid.appendChild(tile);
    }
  });