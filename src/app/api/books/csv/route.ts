import { NextResponse } from 'next/server';
import { bookService } from '../services/booksService';
import { IBookData } from '@/sources/interfaces';
import { messages } from '@/sources/messages';
import { STATUS_SERVER } from '@/sources/constants';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const selectBookParam = url.searchParams.get('selectBook');

  if (!selectBookParam) {
    return NextResponse.json(
      { message: messages.emptyList },
      { status: STATUS_SERVER }
    );
  }

  const selectBook = selectBookParam.split(',');

  const books: IBookData[] = (
    await Promise.all(selectBook.map(id => bookService.getBookById(id)))
  ).filter((book): book is IBookData => book !== null);

  if (books.length === 0) {
    return NextResponse.json(
      { message: messages.emptyList },
      { status: STATUS_SERVER }
    );
  }

  const header = [
    'Title',
    'Image',
    'Description',
    'Author',
    'First publish date',
  ];

  const csvContent = [
    header.join(','),
    ...books.map(book =>
      [
        `"${book.title}"`,
        `"${book.image || ''}"`,
        `"${book.bookDetails.description || ''}"`,
        `"${book.bookDetails.authors || ''}"`,
        `"${book.bookDetails.first_publish_date || ''}"`,
      ].join(', ')
    ),
  ].join('\n');

  return new Response(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${books.length}_items.csv"`,
    },
  });
}
