import { sampleBook } from '../util/sampleBook.js';

const fetch = require('node-fetch');
const {  app, start, clearDatabase  } = require('../../../../server/server');
const http = require('http');


const testPort = 3300;
const baseUrl = `http://127.0.0.1:${testPort}/books`;

const postBook = async (bookData, submitAsXML = false, submitEmpty = false) => {
  const headers = submitAsXML
    ? { 'Content-Type': 'application/xml' }
    : { 'Content-Type': 'application/json' };

  const body = submitEmpty ? null : JSON.stringify(bookData);

  return fetch(baseUrl, {
    method: 'POST',
    headers: headers,
    body: body,
  });
};



const testScenarios = [
  {
    description: 'submits XML data',
    submitAsXML: true,
    expectError: true,
    errorMessage: 'Invalid content type. Expected application/json.'
  },
  {
    description: 'submits a request with no data',
    submitEmpty: true,
    expectError: true,
    errorMessage: 'Empty request body.'
  },
  {
    description: 'submits a book with missing title',
    fieldToRemove: 'title',
    expectError: true,
    errorMessage: 'Missing required field: title.'
  },
  {
    description: 'submits a book with missing ISBN',
    fieldToRemove: 'isbn',
    expectError: true,
    errorMessage: 'Missing required field: isbn.'
  },
  {
    description: 'submits a book missing authors',
    fieldToRemove: 'authors',
    newValue: [],
    expectError: true,
    errorMessage: 'Authors array cannot be empty.'
  },
  {
    description: 'submits a book with author missing their first name',
    fieldToRemove: 'authors',  
    newValue: [{ name: { firstName: '', surname: 'Doe' } }],
    expectError: true,
    errorMessage: 'Author 1 is missing a first name.'
  },
  {
    description: 'submits a book with missing author surname',
    fieldToRemove: 'authors',
    newValue: [{ name: { firstName: 'John' } }],
    expectError: true,
    errorMessage: 'Author 1 is missing a surname.'
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
    newValue: 'invalid_year',
    expectError: true,
    errorMessage: 'Release year must be a number.'
  },
  {
    description: 'submits a book with release year in the far future',
    fieldToRemove: 'releaseYear',
    newValue: new Date().getFullYear() + 2,
    expectError: true,
    errorMessage: 'Release year cannot be more than the current year + 1.',
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
  });

  afterEach(async () => {
    await clearDatabase();
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

  test('tries to add a book with the same isbn twice and receives an error', async () => {

    const firstResponse = await postBook(sampleBook);
    expect(firstResponse.status).toBe(201);
  

    const secondResponse = await postBook(sampleBook);
    expect(secondResponse.status).toBe(400); 
  });

  testScenarios.forEach((scenario) => {
    test(`${scenario.description} and receives ${scenario.expectError ? 'an error' : 'a success'} response`, async () => {
      const bookData = {
        ...sampleBook, [scenario.fieldToRemove]: scenario.hasOwnProperty('newValue')? scenario.newValue: undefined,
      };

      const response = await postBook(bookData, scenario.submitAsXML, scenario.submitEmpty);
    
      if (scenario.expectError) {
        expect(response.status).toBe(400);
        const errorResponse = await response.json();
        expect(errorResponse.message).toBe(scenario.errorMessage);
      } else {
        expect(response.status).toBe(201);
      }
    });
  });
});