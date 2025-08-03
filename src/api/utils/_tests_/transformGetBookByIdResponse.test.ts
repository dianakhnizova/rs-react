import { transformGetBookByIdResponse } from '../transformGetBookByIdResponse';
import { OPEN_LIBRARY_COVER_URL } from '@/sources/constants';
import type { IBookItemResponse } from '@/sources/interfaces';

describe('transformGetBookByIdResponse', () => {
  it('Should correctly transform book with plain description and cover', () => {
    const mockBook: IBookItemResponse = {
      key: '/works/OL123W',
      title: 'Test Book',
      description: 'This is a test book.',
      authors: [],
      covers: [123],
      first_publish_date: '2020',
    };

    const result = transformGetBookByIdResponse(mockBook, [
      'Author One',
      'Author Two',
    ]);

    expect(result).toEqual({
      id: 'OL123W',
      title: 'TEST BOOK',
      image: `${OPEN_LIBRARY_COVER_URL}/123-M.jpg`,
      bookDetails: {
        description: 'This is a test book.',
        authors: 'Author One, Author Two',
        year: '2020',
      },
    });
  });

  it('Should handle description as object and missing optional fields', () => {
    const mockBook: IBookItemResponse = {
      key: '/works/OL456W',
      title: 'Another Book',
      description: { value: 'Object description' },
      authors: [],
    };

    const result = transformGetBookByIdResponse(mockBook, []);

    expect(result).toEqual({
      id: 'OL456W',
      title: 'ANOTHER BOOK',
      image: '',
      bookDetails: {
        description: 'Object description',
        authors: '',
        year: '',
      },
    });
  });

  it('Should handle missing key and title gracefully', () => {
    const mockBook = {
      description: 'Fallback book',
      authors: [],
    } as unknown as IBookItemResponse;

    const result = transformGetBookByIdResponse(mockBook, []);

    expect(result).toEqual({
      id: '',
      title: '',
      image: '',
      bookDetails: {
        description: 'Fallback book',
        authors: '',
        year: '',
      },
    });
  });
});
