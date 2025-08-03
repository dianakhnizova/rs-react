import { IBookData } from '@/sources/interfaces';
import { RefObject } from 'react';

export const downloadBooksCsv = (
  books: IBookData[],
  link: RefObject<HTMLAnchorElement | null>
) => {
  if (books.length === 0) return;

  const header = [
    'Title',
    'First sentence',
    'Image',
    'Author',
    'First publish year',
    'Pages',
  ];

  const rows = books.map(book => [
    `"${book.title}"`,
    `"${book.bookDetails.description || ''}"`,
    `"${book.image || ''}"`,
    `"${book.bookDetails.authors || ''}"`,
    `"${book.bookDetails.first_publish_year || ''}"`,
    `"${book.bookDetails.pages || ''}"`,
  ]);

  const csvContent = [header.join(','), ...rows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const fileName = `${books.length}`;

  if (link.current) {
    link.current.href = url;
    link.current.download = `${fileName}_items.csv`;
    link.current.click();
    URL.revokeObjectURL(url);
  }
};
