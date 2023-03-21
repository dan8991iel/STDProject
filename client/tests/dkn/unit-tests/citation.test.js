import { generateCitation } from '../../../src//modules/citation.js';


const exampleBook = {
    title: 'Example Book',
    subtitle: 'A Great Subtitle',
    authors: ['John Doe', 'Jane Smith'],
    releaseYear: '2022',
    category: 'Fiction',
    publisher: 'Example Publisher',
    edition: '1st',
  };


  test('APA citation style', () => {
    const citation = generateCitation('apa', exampleBook);
    expect(citation).toBe('Doe, John, Smith, Jane. (2022). Example Book. 1st ed., Example Publisher.');
  });
  
  test('MLA citation style', () => {
    const citation = generateCitation('mla', exampleBook);
    expect(citation).toBe('Doe, John, Smith, Jane. Example Book: A Great Subtitle. 1st ed., Example Publisher, 2022.');
  });
  
  test('Chicago citation style', () => {
    const citation = generateCitation('chicago', exampleBook);
    expect(citation).toBe('Doe, John, Smith, Jane. Example Book: A Great Subtitle. 1st ed., Example Publisher, 2022.');
  });

  test('APA citation style - missing year', () => {
    const {releaseYear, ...exampleBookMissingYear} = exampleBook;
    const citation = generateCitation('apa', exampleBookMissingYear);
    expect(citation).toBe('Doe, John, Smith, Jane. (o. J.). Example Book. 1st ed., Example Publisher.');
  });
  
  test('MLA citation style - missing year', () => {
    const {releaseYear, ...exampleBookMissingYear} = exampleBook;
    const citation = generateCitation('mla', exampleBookMissingYear);
    expect(citation).toBe('Doe, John, Smith, Jane. Example Book: A Great Subtitle. 1st ed., Example Publisher, o. J..');
  });
  
  test('Chicago citation style - missing year', () => {
    const {releaseYear, ...exampleBookMissingYear} = exampleBook;
    const citation = generateCitation('chicago', exampleBookMissingYear);
    expect(citation).toBe('Doe, John, Smith, Jane. Example Book: A Great Subtitle. 1st ed., Example Publisher, o. J..');
  });
  
  test('APA citation style - missing authors', () => {
    const {authors, ...exampleBookMissingAuthors} = exampleBook;
    const citation = generateCitation('apa', exampleBookMissingAuthors);
    expect(citation).toBe('. (2022). Example Book. 1st ed., Example Publisher.');
  });
  
  test('MLA citation style - missing authors', () => {
    const {authors, ...exampleBookMissingAuthors} = exampleBook;
    const citation = generateCitation('mla', exampleBookMissingAuthors);
    expect(citation).toBe('. Example Book: A Great Subtitle. 1st ed., Example Publisher, 2022.');
  });
  
  test('Chicago citation style - missing authors', () => {
    const {authors, ...exampleBookMissingAuthors} = exampleBook;
    const citation = generateCitation('chicago', exampleBookMissingAuthors);
    expect(citation).toBe('. Example Book: A Great Subtitle. 1st ed., Example Publisher, 2022.');
  });

  test('APA citation style - missing edition', () => {
    const {edition, ...exampleBookMissingEdition} = exampleBook;
    const citation = generateCitation('apa', exampleBookMissingEdition);
    expect(citation).toBe('Doe, John, Smith, Jane. (2022). Example Book. Example Publisher.');
  });
  
  test('MLA citation style - missing edition', () => {
    const {edition, ...exampleBookMissingEdition} = exampleBook;
    const citation = generateCitation('mla', exampleBookMissingEdition);
    expect(citation).toBe('Doe, John, Smith, Jane. Example Book: A Great Subtitle. Example Publisher, 2022.');
  });
  
  test('Chicago citation style - missing edition', () => {
    const {edition, ...exampleBookMissingEdition} = exampleBook;
    const citation = generateCitation('chicago', exampleBookMissingEdition);
    expect(citation).toBe('Doe, John, Smith, Jane. Example Book: A Great Subtitle. Example Publisher, 2022.');
  });

  test('MLA citation style - missing subtitle', () => {
    const {subtitle, ...exampleBookMissingSubtitle} = exampleBook;
    const citation = generateCitation('mla', exampleBookMissingSubtitle);
    expect(citation).toBe('Doe, John, Smith, Jane. Example Book. 1st ed., Example Publisher, 2022.');
  });
  
  test('Chicago citation style - missing subtitle', () => {
    const {subtitle, ...exampleBookMissingSubtitle} = exampleBook;
    const citation = generateCitation('chicago', exampleBookMissingSubtitle);
    expect(citation).toBe('Doe, John, Smith, Jane. Example Book. 1st ed., Example Publisher, 2022.');
  });

  test('Unsupported citation style', () => {
    expect(generateCitation('unsupportedStyle', exampleBook)).toBe('');
  });