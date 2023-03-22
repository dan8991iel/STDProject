async function displayAddBookForm(content) {
    content.innerHTML = await (await fetch('../components/contribute/addBook.html')).text();
    
    //document.getElementById('addBookForm').addEventListener('submit', submitAddBookForm);
}

function submitAddBookForm(event) {
    // ... (content of submitAddBookForm function)
}

document.addEventListener('DOMContentLoaded', () => {
    const authorContainer = document.getElementById('author-container');
    const addAuthorButton = document.getElementById('add-author');

    let authorCount = 1;

    addAuthorButton.addEventListener('click', () => {
        authorCount++;

        const authorInputSet = document.createElement('div');
        authorInputSet.classList.add('author-input-set');

        const firstNameInput = document.createElement('div');
        firstNameInput.classList.add('input-field', 'inline');
        firstNameInput.innerHTML = `
            <label for="authorFirstName-${authorCount}" class="active">Author First Name</label>
            <input id="authorFirstName-${authorCount}" type="text" required placeholder="Example: John">
        `;

        const lastNameInput = document.createElement('div');
        lastNameInput.classList.add('input-field', 'inline');
        lastNameInput.innerHTML = `
            <label for="authorLastName-${authorCount}" class="active">Author Last Name</label>
            <input id="authorLastName-${authorCount}" type="text" required placeholder="Example: Doe">
        `;

        authorInputSet.appendChild(firstNameInput);
        authorInputSet.appendChild(lastNameInput);
        authorContainer.appendChild(authorInputSet);
    });
});

export { displayAddBookForm };