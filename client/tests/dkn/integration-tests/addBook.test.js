import { submitAddBookForm } from '../client/addBook';
import fetchMock from 'jest-fetch-mock';

// Mocking the DOM elements needed for the test
const setupDOM = () => {
  document.body.innerHTML = `
    <form id="addBookForm">
      <input id="title" value="Sample Title" />
      <input id="subheading" value="Sample Subheading" />
      <input id="isbn" value="1234567890" />
      <input id="releaseYear" value="2022" />
      <input id="edition" value="1" />
      <input id="publisher" value="Sample Publisher" />
      <div id="author-container">
        <div class="author-input-set">
          <input id="authorFirstName-1" value="John" />
          <input id="authorLastName-1" value="Doe" />
        </div>
      </div>
    </form>
  `;
};

describe('Add Book Integration Test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    setupDOM();
  });

  test('submits a new book and receives a success response', async () => {
    const successResponse = {
      status: 201,
      message: 'Book successfully added!',
    };

    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const form = document.getElementById('addBookForm');
    const event = { preventDefault: jest.fn() };

    await submitAddBookForm(event);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toEqual('http://127.0.0.1:3000/books');
    expect(fetchMock.mock.calls[0][1].method).toEqual('POST');
    expect(fetchMock.mock.calls[0][1].headers['Content-Type']).toEqual('application/json');

    const expectedBody = {
      title: 'Sample Title',
      subheading: 'Sample Subheading',
      isbn: '1234567890',
      authors: [{ name: { firstName: 'John', surname: 'Doe' } }],
      releaseYear: 2022,
      edition: '1st',
      publisher: 'Sample Publisher',
    };
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual(expectedBody);
  });
});