export function generateCitation(style, book) {
  let authorsFormatted;

  if (book.authors) {
    authorsFormatted = book.authors
      .map((author) => {
        const [firstName, lastName] = author.split(' ');
        return `${lastName}, ${firstName}`;
      })
      .join(', ');
  } else {
    authorsFormatted = '';
  }

  switch (style) {
    case 'apa':
      return `${authorsFormatted}. (${
        book.releaseYear ? book.releaseYear : 'o. J.'
      }). ${book.title}. ${book.edition ? book.edition + ' ed., ' : ''}${book.publisher}.`;
    case 'mla':
      return `${authorsFormatted}. ${book.title}${
        book.subtitle ? ': ' + book.subtitle : ''
      }. ${book.edition ? book.edition + ' ed., ' : ''}${book.publisher}, ${
        book.releaseYear ? book.releaseYear : 'o. J.'
      }.`;
    case 'chicago':
      return `${authorsFormatted}. ${book.title}${
        book.subtitle ? ': ' + book.subtitle : ''
      }. ${book.edition ? book.edition + ' ed., ' : ''}${book.publisher}, ${
        book.releaseYear ? book.releaseYear : 'o. J.'
      }.`;
    default:
      return '';
  }
}