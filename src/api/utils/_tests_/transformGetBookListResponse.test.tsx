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
});
