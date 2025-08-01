import { OPEN_LIBRARY_COVER_URL } from '@/sources/constants';
import type { IBookItemResponse, IBookData } from '@/sources/interfaces';

export const transformGetBookByIdResponse = (
  book: IBookItemResponse,
  authorNames: string[]
): IBookData => {
  return {
    id: book.key.replace('/works/', ''),
    title: book.title.toUpperCase() || '',
    image: book.covers?.[0]
      ? `${OPEN_LIBRARY_COVER_URL}/${book.covers[0]}-M.jpg`
      : '',

    bookDetails: {
      description:
        typeof book.description === 'object'
          ? book.description?.value
          : book.description || '',
      authors: authorNames.filter(Boolean).join(', '),
      year: book.first_publish_date || '',
    },
  };
};
