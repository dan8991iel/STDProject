const fetch = require('node-fetch');
const { mongoose, app, start } = require('../../../../server/server');
const http = require('http');

const testPort = 3300;
const baseUrl = `http://127.0.0.1:${testPort}/books`;

const postBook = async (bookData) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
};

const sampleBook = {
  title: 'Sample Title',
  subtitle: 'Sample subtitle',
  isbn: '1234567890',
  authors: [{ name: { firstName: 'John', surname: 'Doe' } }],
  releaseYear: 2022,
  edition: '2nd',
  publisher: 'Sample Publisher',
};

const testScenarios = [
  {
    description: 'submits a book with missing title',
    fieldToRemove: 'title',
    expectError: true
  },
  {
    description: 'submits a book with missing ISBN',
    fieldToRemove: 'isbn',
    expectError: true
  },
  {
    description: 'submits a book missing authors',
    fieldToRemove: 'authors',
    expectError: true,
    newValue: []
  },
  {
    description: 'submits a book with author missing their first name',
    fieldToRemove: 'authors',
    expectError: true,
    newValue: [{ name: { firstName: '', surname: 'Doe' } }]
  },
  {
    description: 'submits a book with missing author surname',
    fieldToRemove: 'authors',
    expectError: true,
    newValue: [{ name: { firstName: 'John' } }]
  },
  {
    description: 'submits a book with missing subtitle',
    fieldToRemove: 'subtitle',
    expectError: false
  },
  {
    description: 'submits a book with missing publisher',
    fieldToRemove: 'publisher',
    expectError: false
  },
  {
    description: 'submits a book with invalid release year',
    fieldToRemove: 'releaseYear',
    expectError: true,
    newValue: 'invalid_year'
  },
  {
    description: 'submits a book with missing release year',
    fieldToRemove: 'releaseYear',
    expectError: false
  },
  {
    description: 'submits a book with missing edition',
    fieldToRemove: 'edition',
    expectError: false
  },
];

describe('Add Book Integration Test', () => {
  let server;

  beforeAll(async () => {
    await start({ useTestDB: true, port: testPort });
    server = http.createServer(app);
  });

  afterAll(async () => {
    await server.close();
    await mongoose.connection.close();
  });

  test('submits a new book and receives a success response', async () => {
    const response = await postBook(sampleBook);

    expect(response.status).toBe(201);
    const savedBook = await response.json();
    Object.keys(sampleBook).forEach((key) => {
      if (key === 'authors') {
        expect(savedBook[key]).toEqual(
          expect.arrayContaining(
            sampleBook[key].map((author, index) =>
              expect.objectContaining({
                name: expect.objectContaining({
                  firstName: author.name.firstName,
                  surname: author.name.surname,
                }),
              })
            )
          )
        );
      } else {
        expect(savedBook[key]).toEqual(sampleBook[key]);
      }
    });
  });

  testScenarios.forEach((scenario) => {
    test(`${scenario.description} and receives ${scenario.expectError ? 'an error' : 'a success'} response`, async () => {
      const bookData = {
        ...sampleBook, [scenario.fieldToRemove]: scenario.hasOwnProperty('newValue')? scenario.newValue: undefined,
      };

      const response = await postBook(bookData);
    
      if (scenario.expectError) {
        expect(response.status).toBe(400);
      } else {
        expect(response.status).toBe(201);
      }
    });
  });
});

/*
test('submits a book with missing title and receives an error response', async () => {
  const { title, ...bookWithoutTitle } = sampleBook;
  const response = await postBook(bookWithoutTitle);
  expect(response.status).toBe(400);
});

test('submits a book with missing ISBN and receives an error response', async () => {
  const { isbn, ...bookWithoutISBN } = sampleBook;
  const response = await postBook(bookWithoutISBN);
  expect(response.status).toBe(400);
});

test('submits a book missing authors and receives an error response', async () => {
  const bookWithoutAuthors = { ...sampleBook, authors: [] };
const response = await postBook(bookWithoutAuthors);
expect(response.status).toBe(400);
});

test('submits a book with author missing their first name and receives an error response', async () => {
  const bookWithMissingFirstName = {
    ...sampleBook,
    authors: [{ name: { firstName: '', surname: 'Doe' } }],
  };
  const response = await postBook(bookWithMissingFirstName);
  expect(response.status).toBe(400);
});

test('submits a book with missing author surname and receives an error response', async () => {
  const bookWithIncompleteAuthor = {
    ...sampleBook,
    authors: [{ name: { firstName: 'John' } }],
  };
  const response = await postBook(bookWithIncompleteAuthor);
  expect(response.status).toBe(400);
});

test('submits a book with missing subtitle and receives a success response', async () => {
  const { subtitle, ...bookWithoutSubtitle } = sampleBook;
  const response = await postBook(bookWithoutSubtitle);
  expect(response.status).toBe(201);
});

test('submits a book with missing publisher and receives a success response', async () => {
  const { publisher, ...bookWithoutPublisher } = sampleBook;
  const response = await postBook(bookWithoutPublisher);
  expect(response.status).toBe(201);
});

test('submits a book with invalid release year and receives an error response', async () => {
  const bookWithInvalidYear = {
    ...sampleBook,
    releaseYear: 'invalid_year',
  };
  const response = await postBook(bookWithInvalidYear);
  expect(response.status).toBe(400);
});

test('submits a book with missing edition and receives a success response', async () => {
  const { edition, ...bookWithoutEdition } = sampleBook;
  const response = await postBook(bookWithoutEdition);
  expect(response.status).toBe(201);
});*/