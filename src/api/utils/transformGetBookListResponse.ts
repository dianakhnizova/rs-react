import { IBooksListResponse, IBookData } from '@/sources/interfaces';

export const transformGetBookListResponse = (response: IBooksListResponse) => {
  const booksList: IBookData[] = Array.isArray(response?.docs)
    ? response.docs.map(book => ({
        id: book.key.replace('/works/', ''),
        title: book.title.toUpperCase(),
        image: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : '',
        bookDetails: {
          description: Array.isArray(book.first_sentence)
            ? book.first_sentence.join(' ')
            : book.first_sentence || '',
          authors: Array.isArray(book.author_name)
            ? book.author_name.map(String).join(', ')
            : '',
          year: book.first_publish_year || '',
          pages: book.edition_count || '',
        },
      }))
    : [];

  return { books: booksList, totalItems: Number(response?.numFound) || 0 };
};
