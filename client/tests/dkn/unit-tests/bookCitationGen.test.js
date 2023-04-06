import { generateCitation } from '../../../src/modules/bookCitationGen.js';
import { sampleBook } from '../util/sampleBook.js';



  const testCases = [
    {
      description: 'with all properties',
      bookModifications: {},
      expectedCitations: {
        apa: 'Doe, J. (2022). Sample Title: Sample subtitle (2nd ed.). Sample Publisher.',
        mla: 'Doe, John. Sample Title: Sample subtitle. 2nd ed., Sample Publisher, 2022.',
        chicago: 'Doe, John. 2022. Sample Title: Sample subtitle. 2nd ed. Sample Publisher.',
      },
    },
    {
      description: 'no author',
      bookModifications: {
        authors: undefined,
      },
      expectedCitations: {
        apa: 'Sample Title.(2022). Sample Title: Sample subtitle (2nd ed.). Sample Publisher.',
        mla: 'Sample Title: Sample subtitle. 2nd ed., Sample Publisher, 2022.',
        chicago: '2022. Sample Title: Sample subtitle. 2nd ed. Sample Publisher.',
      },
    },
    {
      description: 'with all properties and one author',
      bookModifications: {
        authors: [{name: {firstName: 'John',surname: 'Doe',},}, {name: {firstName: 'Sarah Jane',surname: 'Smith',},}],
      },
      expectedCitations: {
        apa: 'Doe, J. & Smith, S. J. (2022). Sample Title: Sample subtitle (2nd ed.). Sample Publisher.',
        mla: 'Doe, John, and Sarah Jane Smith. Sample Title: Sample subtitle. 2nd ed., Sample Publisher, 2022.',
        chicago: 'Doe, John, and Sarah Jane Smith. 2022. Sample Title: Sample subtitle. 2nd ed. Sample Publisher.',
      },
    },

    {
      description: 'with all properties and three authors',
      bookModifications: {
        authors: [{name: {firstName: 'John',surname: 'Doe',},},{name: {firstName: 'Sarah Jane',surname: 'Smith',},},{name: {firstName: 'Michael',surname: 'Brown',},},],
      },
      expectedCitations: {
        apa: 'Doe, J., Smith, S. J. & Brown, M. (2022). Sample Title: Sample subtitle (2nd ed.). Sample Publisher.',
        mla: 'Doe, John, et al. Sample Title: Sample subtitle. 2nd ed., Sample Publisher, 2022.',
        chicago: 'Doe, John, Sarah Jane Smith, and Michael Brown. 2022. Sample Title: Sample subtitle. 2nd ed. Sample Publisher.',
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
        chicago: 'Aa, A, B Bb, C Cc, D Dd, E Ee, F Ff, G Gg, et al. 2022. Sample Title: Sample subtitle. 2nd ed. Sample Publisher.',
      },
    },
    {
      description: 'undefined author.name one author ',
      bookModifications: {
        authors: [{name: undefined}],
      },
      expectedCitations: {
        mla: 'Sample Title: Sample subtitle. 2nd ed., Sample Publisher, 2022.',
      },
    },
    {
      description: 'undefined author.name two authors ',
      bookModifications: {
        authors: [{name: undefined},{name: undefined}],
      },
      expectedCitations: {
        mla: 'Sample Title: Sample subtitle. 2nd ed., Sample Publisher, 2022.',
      },
    },
    {
      description: 'undefined author.name three authors ',
      bookModifications: {
        authors: [{name: undefined},{name: undefined},{name: undefined}],
      },
      expectedCitations: {
        mla: 'Sample Title: Sample subtitle. 2nd ed., Sample Publisher, 2022.',
      },
    },
    {
      description: 'missing edition',
      bookModifications: {
        edition: undefined,
      },
      expectedCitations: {
        apa: 'Doe, J. (2022). Sample Title: Sample subtitle. Sample Publisher.',
        mla: 'Doe, John. Sample Title: Sample subtitle. Sample Publisher, 2022.',
        chicago: 'Doe, John. 2022. Sample Title: Sample subtitle. Sample Publisher.',
      },
    },
    {
      description: 'missing year',
      bookModifications: {
        releaseYear: undefined,
      },
      expectedCitations: {
        apa: 'Doe, J. (o. J.). Sample Title: Sample subtitle (2nd ed.). Sample Publisher.',
        mla: 'Doe, John. Sample Title: Sample subtitle. 2nd ed., Sample Publisher, o. J..',
        chicago: 'Doe, John. o. J.. Sample Title: Sample subtitle. 2nd ed. Sample Publisher.',
      },
    },
    {
      description: 'missing subtitle',
      bookModifications: {
        subtitle: undefined,
      },
      expectedCitations: {
        apa: 'Doe, J. (2022). Sample Title (2nd ed.). Sample Publisher.',
        mla: 'Doe, John. Sample Title. 2nd ed., Sample Publisher, 2022.',
        chicago: 'Doe, John. 2022. Sample Title. 2nd ed. Sample Publisher.',
      },
    }
  ];
  
  
  const generateTestCase = (description, bookModifications, expectedCitations) => {
    Object.keys(expectedCitations).forEach((style) => {
      test(`${style.toUpperCase()} citation style - ${description}`, () => {
        const modifiedBook = { ...sampleBook, ...bookModifications };
        const citation = generateCitation(style, modifiedBook);
        expect(citation).toBe(expectedCitations[style]);
      });
    });
  };


  
  testCases.forEach(({ description, bookModifications, expectedCitations }) => {
    generateTestCase(description, bookModifications, expectedCitations);
  });
  

  test('String as book', () => {
    expect(generateCitation('apa', "")).toBe('undefined.(o. J.). undefined. undefined.');
  });

  test('Int as book', () => {
    expect(generateCitation('apa', 2)).toBe('undefined.(o. J.). undefined. undefined.');
  });
  
  test('Unsupported citation style', () => {
    expect(generateCitation('unsupportedStyle', sampleBook)).toBe('');
  });