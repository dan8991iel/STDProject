async function displayDeleteBook(content) {
    content.innerHTML = await (await fetch('../components/contribute/deleteBook.html')).text();
    document.getElementById('deleteBtn').addEventListener('click', deleteBook);
}

function deleteBook() {
    // ... (content of deleteBook function)
}

export { displayDeleteBook };