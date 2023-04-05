const fetch = require('node-fetch');
const { mongoose, app, start } = require('../../../../server/server');
const http = require('http');

describe('Add Book Integration Test', () => {
  let server;
  const testPort = 3100;

  beforeAll(async () => {
    await start({ useTestDB: true , port: testPort});
    server = http.createServer(app);
    server.listen(testPort);
    global.fetch = fetch;
  });

  afterAll(async () => {
    await server.close();
    await mongoose.connection.close();
  });

  test('submits a new book and receives a success response', async () => {
    const bookData = {
      title: 'Sample Title',
      subtitle: 'Sample subtitle',
      isbn: '1234567890',
      authors: [{ name: { firstName: 'John', surname: 'Doe' } }],
      releaseYear: 2022,
      edition: '1st',
      publisher: 'Sample Publisher',
    };

    const response = await fetch(`http://127.0.0.1:${testPort}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
    });

    expect(response.status).toBe(201);
    const savedBook = await response.json();
    expect(savedBook.title).toBe(bookData.title);
    expect(savedBook.subtitle).toBe(bookData.subtitle);
    expect(savedBook.isbn).toBe(bookData.isbn);
    expect(savedBook.authors).toEqual(
        expect.arrayContaining(
        bookData.authors.map((author) =>
            expect.objectContaining({
            name: expect.objectContaining({
                firstName: author.name.firstName,
                surname: author.name.surname,
            }),
            }),
        ),
        ),
    );
    expect(savedBook.releaseYear).toBe(bookData.releaseYear);
    expect(savedBook.edition).toBe(bookData.edition);
    expect(savedBook.publisher).toBe(bookData.publisher);
    });
});