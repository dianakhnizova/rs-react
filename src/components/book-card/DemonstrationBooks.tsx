import { IBookData } from '@/sources/interfaces';
import { BookCard } from './BookCard';

interface Props {
  books: IBookData[];
}

export const DemonstrationBooks = ({ books }: Props) => (
  <>
    {books.map(book => (
      <BookCard key={book.id} book={book} isFlyout />
    ))}
  </>
);
