async function displayEditBookForm(content) {
    content.innerHTML = await (await fetch('../components/contribute/editBook.html')).text();
    //document.getElementById('editBookForm').addEventListener('submit', submitEditBookForm);

    const title = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');
    const isbn = document.getElementById('isbn');
    const authorFirstName = document.getElementById('authorFirstName-1');
    const authorLastName = document.getElementById('authorLastName-1');
    const releaseYear = document.getElementById('releaseYear');
    const edition = document.getElementById('edition');
    const publisher = document.getElementById('publisher');

    loadProductTitles();

    const areaSelect = document.getElementById('titleDropDown');
    console.log(areaSelect)

    getBookDetails(areaSelect)
    
    //document.getElementById('titleDropDown').addEventListener('change', submitEditBookForm);
}

function submitEditBookForm(event) {
    // ... (content of submitEditBookForm function)
}

function getBookDetails(areaSelect){
  areaSelect.addEventListener(`change`, (e) => {
    const select = e.target;
    const selectedTitle = select.value;
    console.log(title)
    fetch('http://127.0.0.1:3000/books',{method:"GET"})
    .then(response => response.json())
    .then(books => {
    for (let book of books) {       
      if(book.title.includes(selectedTitle)){
        title.setAttribute('value', book.title);
        subtitle.setAttribute('value', book.subtitle);
        isbn.setAttribute('value', book.isbn);
        authorFirstName.setAttribute('value', book.authors.firstName);
        authorLastName.setAttribute('value', book.authors.name.surname);
        releaseYear.setAttribute('value', book.releaseYear);
        edition.setAttribute('value', book.edition);
        publisher.setAttribute('value', book.publisher);
        return book;
    }
  }
});

  });
}

function submit(){
  title = document.getElementById('title');
  subtitle = document.getElementById('subtitle');
  isbn = document.getElementById('isbn');
  authorFirstName = document.getElementById('authorFirstName-1');
  authorLastName = document.getElementById('authorLastName-1');
  releaseYear = document.getElementById('releaseYear');
  edition = document.getElementById('edition');
  publisher = document.getElementById('publisher');

  const bookData = {
    title,
    subtitle,
    isbn,
    authors,
    releaseYear: parseInt(releaseYear, 10),
    edition,
    publisher,
};

  try {
    const response = fetch('http://127.0.0.1:3000/books/1', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert('Book successfully added!');
    event.target.reset();
} catch (error) {
    console.error('Error:', error);
    alert('Failed to add the book. Please try again.');
}
}

function loadProductTitles() {
fetch('http://127.0.0.1:3000/books',{method:"GET"})
  .then(response => response.json())
  .then(books => {
    const titleDropDown = document.getElementById("titleDropDown")
    for (let book of books) {
      const tile = document.createElement('option')
      tile.classList.add('tile');
      tile.innerHTML = book.title
     // console.log(tile  , titleDropDown)
      titleDropDown.appendChild(tile)
    }
  });
}

function searchBook() {
    fetch('http://127.0.0.1:3000/books',{method:"GET"})
  .then(response => response.json())
  .then(books => {
    for (let book of books) {
        bookTitles.append(book.title)
      const tile = document.createElement('option');
      tile.classList.add('tile');
      console.log(book.title)
    }
  });
}

function getDropdown(){
    document.addEventListener("DOMContentLoaded", function(){
window.onload = function() {
    const titleDropDown = document.getElementById(".titleDropDown");
    console.log("Ausgabe: " + titleDropDown)
    if(titleDropDown){
        fetch('http://127.0.0.1:3000/books',{method:"GET"})
        .then(response => response.json())
        .then(books => {
            books.forEach(book => {
                const option = document.createElement("option");
                option.text = book.title;
                console.log(book.title)
                option.value = book.id;
                TitleDropDown.add(option)    
            });
        })
        .catch(error => {
            console.log(error)
        });
        console.log("Ausgabe2: " + titleDropDown)
    }
    else{
        console.error("Das Element wurde nicht gefunden")
    }
}

})
}

export { displayEditBookForm, searchBook, getDropdown, submit, getBookDetails };
