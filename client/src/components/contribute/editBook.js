async function displayEditBookForm(content) {
    content.innerHTML = await (await fetch('../components/contribute/editBook.html')).text();
    //document.getElementById('editBookForm').addEventListener('submit', submitEditBookForm);

    loadProductTitles();
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
      console.log(tile  , titleDropDown)
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
