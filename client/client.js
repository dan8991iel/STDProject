const bookList = document.getElementById('book-list')


fetch('http://127.0.0.1:3000/books',{method:"GET"})
  .then(response => response.json())
  .then(books => {
    books.forEach(book => {
      const row = document.createElement('tr')
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.isbn}</td>
        <td>${book.category}</td>
        <td>${book.authors.join(', ')}</td>
        <td>${book.edition}</td>
        <td>${book.status}</td>
      `
      bookList.appendChild(row)
    })
  })
  .catch(error => console.log(error))