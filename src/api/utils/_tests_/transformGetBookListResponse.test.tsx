import { transformGetBookListResponse } from '../transformGetBookListResponse';
import type { IBooksListResponse } from '@/sources/interfaces';

describe('transformGetBookListResponse', () => {
  it('Should correctly transform book list response', () => {
    const mockResponse: IBooksListResponse = {
      numFound: 1,
      docs: [
        {
          key: '/works/OL123W',
          title: 'Sample Book',
          first_sentence: ['First sentence part 1.', 'Part 2.'],
          first_publish_year: '2021',
          edition_count: '3',
          author_name: ['Author One'],
          cover_i: 456,
        },
      ],
    };

    const result = transformGetBookListResponse(mockResponse);

    expect(result).toEqual({
      totalItems: 1,
      books: [
        {
          id: 'OL123W',
          title: 'SAMPLE BOOK',
          image: 'https://covers.openlibrary.org/b/id/456-M.jpg',
          bookDetails: {
            description: 'First sentence part 1. Part 2.',
            authors: 'Author One',
            year: '2021',
            pages: '3',
          },
        },
      ],
    });
  });

  it('Should handle missing optional fields gracefully', () => {
    const mockResponse: IBooksListResponse = {
      numFound: 1,
      docs: [
        {
          key: '/works/OL999W',
          title: 'No Fields Book',
          first_publish_year: '2000',
          edition_count: '1',
        },
      ],
    };

    const result = transformGetBookListResponse(mockResponse);

    expect(result).toEqual({
      totalItems: 1,
      books: [
        {
          id: 'OL999W',
          title: 'NO FIELDS BOOK',
          image: '',
          bookDetails: {
            description: '',
            authors: '',
            year: '2000',
            pages: '1',
          },
        },
      ],
    });
  });

  it('Should return empty list when docs is not an array', () => {
    const mockResponse = {
      numFound: 5,
      docs: null,
    } as unknown as IBooksListResponse;

    const result = transformGetBookListResponse(mockResponse);

    expect(result).toEqual({
      books: [],
      totalItems: 5,
    });
  });

  it('Should handle missing year and pages gracefully', () => {
    const mockResponse: IBooksListResponse = {
      numFound: 1,
      docs: [
        {
          key: '/works/OL321W',
          title: 'Missing Year and Pages',
          first_sentence: ['Some intro'],
          author_name: ['Author X'],
          cover_i: 789,
        },
      ],
    };

    const result = transformGetBookListResponse(mockResponse);

    expect(result).toEqual({
      totalItems: 1,
      books: [
        {
          id: 'OL321W',
          title: 'MISSING YEAR AND PAGES',
          image: 'https://covers.openlibrary.org/b/id/789-M.jpg',
          bookDetails: {
            description: 'Some intro',
            authors: 'Author X',
            year: '',
            pages: '',
          },
        },
      ],
    });
  });
});
