async function displayEditBookForm(content) {
    content.innerHTML = await (await fetch('../components/contribute/editBook.html')).text();
    document.getElementById('editBookForm').addEventListener('submit', submitEditBookForm);
}

function submitEditBookForm(event) {
    // ... (content of submitEditBookForm function)
}

function searchBook() {
    // ... (content of searchBook function)
}

export { displayEditBookForm, searchBook };