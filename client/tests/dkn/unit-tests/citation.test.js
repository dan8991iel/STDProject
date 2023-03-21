

const exampleBook = {
    title: 'Example Book',
    subtitle: 'A Great Subtitle',
    authors: ['John Doe', 'Jane Smith'],
    releaseYear: '2022',
    category: 'Fiction',
    publisher: 'Example Publisher',
    edition: '1st',
  };

  const exampleBookMissingYear = {
    title: 'Example Book',
    subtitle: 'A Great Subtitle',
    authors: ['John Doe', 'Jane Smith'],
    category: 'Fiction',
    publisher: 'Example Publisher',
    edition: '1st',
  };
  
  const exampleBookMissingAuthors = {
    title: 'Example Book',
    subtitle: 'A Great Subtitle',
    releaseYear: '2022',
    category: 'Fiction',
    publisher: 'Example Publisher',
    edition: '1st',
  };


  test('APA citation style', () => {
    expect(generateCitation('apa', exampleBook)).toBe('Doe, John, Smith, Jane. (2022). Example Book. 1st ed., Example Publisher.');
  });
  
  test('MLA citation style', () => {
    expect(generateCitation('mla', exampleBook)).toBe('Doe, John, Smith, Jane. Example Book: A Great Subtitle. 1st ed., Example Publisher, 2022.');
  });
  
  test('Chicago citation style', () => {
    expect(generateCitation('chicago', exampleBook)).toBe('Doe, John, Smith, Jane. Example Book: A Great Subtitle. 1st ed., Example Publisher, 2022.');
  });

  test('APA citation style - missing year', () => {
    expect(generateCitation('apa', exampleBookMissingYear)).toBe('Doe, John, Smith, Jane. (o. J.). Example Book. 1st ed., Example Publisher.');
  });
  
  test('MLA citation style - missing year', () => {
    expect(generateCitation('mla', exampleBookMissingYear)).toBe('Doe, John, Smith, Jane. Example Book: A Great Subtitle. 1st ed., Example Publisher, o. J..');
  });
  
  test('Chicago citation style - missing year', () => {
    expect(generateCitation('chicago', exampleBookMissingYear)).toBe('Doe, John, Smith, Jane. Example Book: A Great Subtitle. 1st ed., Example Publisher, o. J..');
  });
  
  test('APA citation style - missing authors', () => {
    expect(generateCitation('apa', exampleBookMissingAuthors)).toBe('. (2022). Example Book. 1st ed., Example Publisher.');
  });
  
  test('MLA citation style - missing authors', () => {
    expect(generateCitation('mla', exampleBookMissingAuthors)).toBe('. Example Book: A Great Subtitle. 1st ed., Example Publisher, 2022.');
  });
  
  test('Chicago citation style - missing authors', () => {
    expect(generateCitation('chicago', exampleBookMissingAuthors)).toBe('. Example Book: A Great Subtitle. 1st ed., Example Publisher, 2022.');
  });