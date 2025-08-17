import { IBookData } from '@/sources/interfaces';
import { messages } from '@/sources/messages';

const ImagePlaceholder = '/img-placeholder.jpg';

export const prepareBooksList = (booksList: IBookData[]): IBookData[] => {
  return booksList.map(book => ({
    id: book.id,
    title: book.title?.toUpperCase() || messages.notFoundDataTitle,
    image: book.image || ImagePlaceholder,
    bookDetails: {
      authors: book.bookDetails.authors,
      first_sentence: book.bookDetails.first_sentence,
      first_publish_year: book.bookDetails.first_publish_year,
    },
  }));
};
