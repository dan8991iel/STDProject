async function displayEditBookForm(content) {
    content.innerHTML = await (await fetch('../components/contribute/editBook.html')).text();
    //document.getElementById('editBookForm').addEventListener('submit', submitEditBookForm);
}

function submitEditBookForm(event) {
    // ... (content of submitEditBookForm function)
}

const titleDropDown = document.getElementById(".titleDropDown")
let i = 0;
var teststring = "";

fetch('http://127.0.0.1:3000/books',{method:"GET"})
  .then(response => response.json())
  .then(books => {
    for (let book of books) {
       // console.log(book.title)
        //titleDropDown.append(book.title)
    //   const tile = document.createElement('option');
    //   tile.classList.add('tile');

    //   const value = document.createElement('value');
    //   value.textContent = i++;
    //   console.log(book.title)
    //   tile.appendChild(value);

    // const title = document.createElement('h2');
    //   title.textContent = book.title;
    //   tile.appendChild(title);


    //   titleDropDown.appendChild(book.title);
    const tile = document.createElement('option')
    tile.classList.add('tile');
  tile.innerHTML = book.title
  console.log(book.title)
  //titleDropDown.appendChild(tile)
    }
    titleDropDown.appendChild(tile)
  });

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
