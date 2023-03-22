import { generateCitation } from '../../../src/modules/bookCitationGen.js';


const exampleBook = {
    title: 'Example Book',
    subheading: 'A Great subheading',
    authors: [
      {
      name: {
        firstName: 'John',
        surname: 'Doe'
      }
    },{
      name: {
        firstName: 'Sarah Jane',
        surname: 'Smith'
      }
    }],
    releaseYear: '2022',
    category: 'Fiction',
    publisher: 'Example Publisher',
    edition: '1st',
  }


  const testCases = [
    {
      description: 'with all properties',
      bookModifications: {},
      expectedCitations: {
        apa: 'Doe, J. & Smith, S. J. (2022). Example Book: A Great subheading (1st ed.). Example Publisher.',
        mla: 'Doe, John, and Sarah Jane Smith. Example Book: A Great subheading. 1st ed., Example Publisher, 2022.',
        chicago: 'Doe, John, and Sarah Jane Smith. 2022. Example Book: A Great subheading. 1st ed. Example Publisher.',
      },
    },
    {
      description: 'no author',
      bookModifications: {
        authors: undefined,
      },
      expectedCitations: {
        apa: 'Example Book.(2022). Example Book: A Great subheading (1st ed.). Example Publisher.',
        mla: 'Example Book: A Great subheading. 1st ed., Example Publisher, 2022.',
        chicago: '2022. Example Book: A Great subheading. 1st ed. Example Publisher.',
      },
    },
    {
      description: 'with all properties and one author',
      bookModifications: {
        authors: [{name: {firstName: 'John',surname: 'Doe',},},],
      },
      expectedCitations: {
        apa: 'Doe, J. (2022). Example Book: A Great subheading (1st ed.). Example Publisher.',
        mla: 'Doe, John. Example Book: A Great subheading. 1st ed., Example Publisher, 2022.',
        chicago: 'Doe, John. 2022. Example Book: A Great subheading. 1st ed. Example Publisher.',
      },
    },

    {
      description: 'with all properties and three authors',
      bookModifications: {
        authors: [{name: {firstName: 'John',surname: 'Doe',},},{name: {firstName: 'Sarah Jane',surname: 'Smith',},},{name: {firstName: 'Michael',surname: 'Brown',},},],
      },
      expectedCitations: {
        apa: 'Doe, J., Smith, S. J. & Brown, M. (2022). Example Book: A Great subheading (1st ed.). Example Publisher.',
        mla: 'Doe, John, et al. Example Book: A Great subheading. 1st ed., Example Publisher, 2022.',
        chicago: 'Doe, John, Sarah Jane Smith, and Michael Brown. 2022. Example Book: A Great subheading. 1st ed. Example Publisher.',
      },
    },
    {
      description: 'eleven authors',
      bookModifications: {
        authors: [
          { name: { firstName: 'A', surname: 'Aa' } },
          { name: { firstName: 'B', surname: 'Bb' } },
          { name: { firstName: 'C', surname: 'Cc' } },
          { name: { firstName: 'D', surname: 'Dd' } },
          { name: { firstName: 'E', surname: 'Ee' } },
          { name: { firstName: 'F', surname: 'Ff' } },
          { name: { firstName: 'G', surname: 'Gg' } },
          { name: { firstName: 'H', surname: 'Hh' } },
          { name: { firstName: 'I', surname: 'Ii' } },
          { name: { firstName: 'J', surname: 'Jj' } },
          { name: { firstName: 'K', surname: 'Kk' } },
        ],
      },
      expectedCitations: {
        chicago: 'Aa, A, B Bb, C Cc, D Dd, E Ee, F Ff, G Gg, et al. 2022. Example Book: A Great subheading. 1st ed. Example Publisher.',
      },
    },
    {
      description: 'undefined author.name one author ',
      bookModifications: {
        authors: [{name: undefined}],
      },
      expectedCitations: {
        mla: 'Example Book: A Great subheading. 1st ed., Example Publisher, 2022.',
      },
    },
    {
      description: 'undefined author.name two authors ',
      bookModifications: {
        authors: [{name: undefined},{name: undefined}],
      },
      expectedCitations: {
        mla: 'Example Book: A Great subheading. 1st ed., Example Publisher, 2022.',
      },
    },
    {
      description: 'undefined author.name three authors ',
      bookModifications: {
        authors: [{name: undefined},{name: undefined},{name: undefined}],
      },
      expectedCitations: {
        mla: 'Example Book: A Great subheading. 1st ed., Example Publisher, 2022.',
      },
    },
    {
      description: 'missing edition',
      bookModifications: {
        edition: undefined,
      },
      expectedCitations: {
        apa: 'Doe, J. & Smith, S. J. (2022). Example Book: A Great subheading. Example Publisher.',
        mla: 'Doe, John, and Sarah Jane Smith. Example Book: A Great subheading. Example Publisher, 2022.',
        chicago: 'Doe, John, and Sarah Jane Smith. 2022. Example Book: A Great subheading. Example Publisher.',
      },
    },
    {
      description: 'missing year',
      bookModifications: {
        releaseYear: undefined,
      },
      expectedCitations: {
        apa: 'Doe, J. & Smith, S. J. (o. J.). Example Book: A Great subheading (1st ed.). Example Publisher.',
        mla: 'Doe, John, and Sarah Jane Smith. Example Book: A Great subheading. 1st ed., Example Publisher, o. J..',
        chicago: 'Doe, John, and Sarah Jane Smith. o. J.. Example Book: A Great subheading. 1st ed. Example Publisher.',
      },
    },
    {
      description: 'missing subheading',
      bookModifications: {
        subheading: undefined,
      },
      expectedCitations: {
        apa: 'Doe, J. & Smith, S. J. (2022). Example Book (1st ed.). Example Publisher.',
        mla: 'Doe, John, and Sarah Jane Smith. Example Book. 1st ed., Example Publisher, 2022.',
        chicago: 'Doe, John, and Sarah Jane Smith. 2022. Example Book. 1st ed. Example Publisher.',
      },
    }
  ];
  
  
  const generateTestCase = (description, bookModifications, expectedCitations) => {
    Object.keys(expectedCitations).forEach((style) => {
      test(`${style.toUpperCase()} citation style - ${description}`, () => {
        const modifiedBook = { ...exampleBook, ...bookModifications };
        const citation = generateCitation(style, modifiedBook);
        expect(citation).toBe(expectedCitations[style]);
      });
    });
  };


  
  testCases.forEach(({ description, bookModifications, expectedCitations }) => {
    generateTestCase(description, bookModifications, expectedCitations);
  });
  

  test('String as book', () => {
    expect(generateCitation('unsupportedStyle', "")).toBe('');
  });

  test('Int as book', () => {
    expect(generateCitation('unsupportedStyle', 2)).toBe('');
  });
  
  test('Unsupported citation style', () => {
    expect(generateCitation('unsupportedStyle', exampleBook)).toBe('');
  });























/*
  test('APA citation style', () => {
    const citation = generateCitation('apa', exampleBook);
    expect(citation).toBe('Doe, J. & Smith, S. J. (2022). Example Book: A Great subheading (1st ed.). Example Publisher.');
  });
  
  test('MLA citation style', () => {
    const citation = generateCitation('mla', exampleBook);
    expect(citation).toBe('Doe, John, and Sarah Jane Smith. Example Book: A Great subheading. 1st ed., Example Publisher, 2022.');
  });
  
  test('Chicago citation style', () => {
    const citation = generateCitation('chicago', exampleBook);
    expect(citation).toBe('Doe, John, and Sarah Jane Smith. Example Book: A Great subheading. 1st ed. Example Publisher, 2022.');
  });

  test('APA citation style - missing year', () => {
    const {releaseYear, ...exampleBookMissingYear} = exampleBook;
    const citation = generateCitation('apa', exampleBookMissingYear);
    expect(citation).toBe('Doe, J. & Smith, S. J. (o. J.). Example Book: A Great subheading (1st ed.). Example Publisher.');
  });
  
  test('MLA citation style - missing year', () => {
    const {releaseYear, ...exampleBookMissingYear} = exampleBook;
    const citation = generateCitation('mla', exampleBookMissingYear);
    expect(citation).toBe('Doe, John, and Sarah Jane Smith. Example Book: A Great subheading. 1st ed., Example Publisher, o. J..');
  });
  
  test('Chicago citation style - missing year', () => {
    const {releaseYear, ...exampleBookMissingYear} = exampleBook;
    const citation = generateCitation('chicago', exampleBookMissingYear);
    expect(citation).toBe('Doe, John, and Sarah Jane Smith. Example Book: A Great subheading. 1st ed. Example Publisher, o. J..');
  });
  
  test('APA citation style - missing authors', () => {
    const {authors, ...exampleBookMissingAuthors} = exampleBook;
    const citation = generateCitation('apa', exampleBookMissingAuthors);
    expect(citation).toBe('Example Book.(2022). Example Book: A Great subheading (1st ed.). Example Publisher.');
  });
  
  test('MLA citation style - missing authors', () => {
    const {authors, ...exampleBookMissingAuthors} = exampleBook;
    const citation = generateCitation('mla', exampleBookMissingAuthors);
    expect(citation).toBe('Example Book: A Great subheading. 1st ed., Example Publisher, 2022.');
  });
  
  test('Chicago citation style - missing authors', () => {
    const {authors, ...exampleBookMissingAuthors} = exampleBook;
    const citation = generateCitation('chicago', exampleBookMissingAuthors);
    expect(citation).toBe('Example Book: A Great subheading. 1st ed. Example Publisher, 2022.');
  });

  test('APA citation style - missing edition', () => {
    const {edition, ...exampleBookMissingEdition} = exampleBook;
    const citation = generateCitation('apa', exampleBookMissingEdition);
    expect(citation).toBe('Doe, J. & Smith, S. J. (2022). Example Book: A Great subheading. Example Publisher.');
  });
  
  test('MLA citation style - missing edition', () => {
    const {edition, ...exampleBookMissingEdition} = exampleBook;
    const citation = generateCitation('mla', exampleBookMissingEdition);
    expect(citation).toBe('Doe, John, and Sarah Jane Smith. Example Book: A Great subheading. Example Publisher, 2022.');
  });
  
  test('Chicago citation style - missing edition', () => {
    const {edition, ...exampleBookMissingEdition} = exampleBook;
    const citation = generateCitation('chicago', exampleBookMissingEdition);
    expect(citation).toBe('Doe, John, and Sarah Jane Smith. Example Book: A Great subheading. Example Publisher, 2022.');
  });

  test('APA citation style - missing subheading', () => {
    const {subheading, ...exampleBookMissingsubheading} = exampleBook;
    const citation = generateCitation('apa', exampleBookMissingsubheading);
    expect(citation).toBe('Doe, J. & Smith, S. J. (2022). Example Book (1st ed.). Example Publisher.');
  });

  test('MLA citation style - missing subheading', () => {
    const {subheading, ...exampleBookMissingsubheading} = exampleBook;
    const citation = generateCitation('mla', exampleBookMissingsubheading);
    expect(citation).toBe('Doe, John, and Sarah Jane Smith. Example Book. 1st ed., Example Publisher, 2022.');
  });
  
  test('Chicago citation style - missing subheading', () => {
    const {subheading, ...exampleBookMissingsubheading} = exampleBook;
    const citation = generateCitation('chicago', exampleBookMissingsubheading);
    expect(citation).toBe('Doe, John, and Sarah Jane Smith. Example Book. 1st ed. Example Publisher, 2022.');
  });

  test('Unsupported citation style', () => {
    expect(generateCitation('unsupportedStyle', exampleBook)).toBe('');
  });
  */