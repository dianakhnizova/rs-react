import { IBooksListResponse, IBookData } from '@/sources/interfaces';

export const transformGetBookListResponse = (response: IBooksListResponse) => {
  const booksList: IBookData[] = response.docs.map(book => ({
    id: book.key.replace('/works/', ''),
    title: book.title,
    image: book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : '',
  }));

  return { books: booksList, totalItems: response.numFound ?? 0 };
};
