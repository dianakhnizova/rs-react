import { IBookData } from '@/sources/interfaces';
import { saveAs } from 'file-saver';

export const downloadBooksCsv = (books: IBookData[]) => {
  const header = ['Title', 'Description', 'Image', 'Author', 'Year', 'Pages'];

  const rows = books.map(book => [
    `"${book.title}"`,
    `"${book.bookDetails.description || ''}"`,
    `"${book.image || ''}"`,
    `"${book.bookDetails.authors || ''}"`,
    `"${book.bookDetails.year || ''}"`,
    `"${book.bookDetails.pages || ''}"`,
  ]);

  const csvContent = [header, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  const fileName = `${books.length}_items.csv`;
  saveAs(blob, fileName);
};
