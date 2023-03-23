async function displayAddBookForm(content) {
    content.innerHTML = await (await fetch('../components/contribute/addBook.html')).text();
    setupEventListeners();
    document.getElementById('addBookForm').addEventListener('submit', submitAddBookForm);
}

async function submitAddBookForm(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const subtitle = document.getElementById('subtitle').value;
    const isbn = document.getElementById('isbn').value;
    const releaseYear = document.getElementById('releaseYear').value;
    const edition = addOrdinalSuffix(document.getElementById('edition').value);
    const publisher = document.getElementById('publisher').value;
    const authorContainer = document.getElementById('author-container');

    const authorInputSets = Array.from(authorContainer.querySelectorAll('.author-input-set'));
    const authors = authorInputSets.map(authorInputSet => {
        const firstName = authorInputSet.querySelector('input[id^="authorFirstName"]').value;
        const surname = authorInputSet.querySelector('input[id^="authorLastName"]').value;
        return { name: { firstName, surname } };
    });

    const bookData = {
        title,
        subtitle,
        isbn,
        authors,
        releaseYear: parseInt(releaseYear, 10),
        edition,
        publisher,
    };
    console.log(bookData);
    console.log(JSON.stringify(bookData));
    
    try {
        const response = await fetch('http://127.0.0.1:3000/books', {
            method: 'POST',
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

function setupEventListeners() {
    const authorContainer = document.getElementById('author-container');
    const addAuthorButton = document.getElementById('add-author');

    if (!authorContainer || !addAuthorButton) {
        console.error('Error: authorContainer or addAuthorButton not found');
        return;
    }

    let authorCount = 1;

    addAuthorButton.addEventListener('click', () => {
        authorCount++;

        const authorInputSet = document.createElement('div');
        authorInputSet.classList.add('author-input-set');

        const firstNameInput = document.createElement('div');
        firstNameInput.classList.add('input-field', 'inline');
        firstNameInput.innerHTML = `
            <label for="authorFirstName-${authorCount}" class="active">Vorname</label>
            <input id="authorFirstName-${authorCount}" type="text" required placeholder="Example: John">
        `;

        const lastNameInput = document.createElement('div');
        lastNameInput.classList.add('input-field', 'inline');
        lastNameInput.innerHTML = `
            <label for="authorLastName-${authorCount}" class="active">Nachnahme</label>
            <input id="authorLastName-${authorCount}" type="text" required placeholder="Example: Doe">
        `;

        authorInputSet.appendChild(firstNameInput);
        authorInputSet.appendChild(lastNameInput);
        authorContainer.appendChild(authorInputSet);

        const removeButton = createRemoveButton(authorInputSet);
        authorInputSet.appendChild(removeButton);
    
        authorContainer.appendChild(authorInputSet);
    });
}

function createRemoveButton(parent) {
    const removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'waves-effect', 'waves-light', 'remove-author');
    removeButton.innerHTML = 'Remove';
    removeButton.addEventListener('click', () => {
        parent.remove();
    });
    return removeButton;
}

function addOrdinalSuffix(number){
    var j = number % 10,
        k = number % 100;
    if (j == 1 && k != 11) {
        return number + "st";
    }
    if (j == 2 && k != 12) {
        return number + "nd";
    }
    if (j == 3 && k != 13) {
        return number + "rd";
    }
    return number + "th";
}

export { displayAddBookForm, submitAddBookForm };