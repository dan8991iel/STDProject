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
          authorFirstName.setAttribute('value', book.authorFirstName);
          authorLastName.setAttribute('value', book.authorLastName);
          releaseYear.setAttribute('value', book.releaseYear);
          edition.setAttribute('value', book.edition);
          publisher.setAttribute('value', book.publisher);
      }
    }
  });

    });
    //document.getElementById('titleDropDown').addEventListener('change', submitEditBookForm);
}

function submitEditBookForm(event) {
    // ... (content of submitEditBookForm function)
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


export { displayEditBookForm, searchBook, getDropdown };
