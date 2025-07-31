import { IBookData } from './interfaces';

export type MyData = {
  label: string;
  data: string;
};

export type BooksListResponse = {
  books: IBookData[];
  totalItems: number;
};
