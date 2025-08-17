export interface IBookData {
  id: string;
  title: string;
  image: string;
  bookDetails: IBookDetails;
}

export interface IBookDetails {
  description?: string;
  first_sentence?: string;
  authors: string;
  first_publish_date?: string;
  first_publish_year?: string;
  pages?: string;
}

export interface IBookSearchResult {
  key: string;
  title: string;
  first_sentence?: string | string[];
  first_publish_year?: string;
  edition_count?: string;
  author_name?: string[];
  cover_i?: number;
}

export interface IAuthorRef {
  author: {
    key: string;
  };
}

export interface IAuthorResponse {
  name: string;
}

export interface IBookItemResponse {
  key: string;
  title: string;
  description?: string | { value: string };
  first_publish_date?: string;
  authors?: IAuthorRef[];
  covers?: number[];
}

export interface IBooksListResponse {
  numFound: number;
  docs: IBookSearchResult[];
}

export interface IApiErrorResponse {
  error: {
    message: string;
  };
}

export interface BookDetail {
  value: string | number;
  className: string;
}

export interface Messages {
  MainPage?: Record<string, string>;
  Header?: Record<string, string>;
  Footer?: Record<string, string>;
  BookListHeader?: Record<string, string>;
  BookDetail?: Record<string, string>;
  AboutPage?: Record<string, string>;
  Sources?: Record<string, string>;
  Notfound?: Record<string, string>;
  Flyout?: Record<string, string>;
  Alt?: Record<string, string>;
  Spinner?: Record<string, string>;
  Popup?: Record<string, string>;
  Pagination?: Record<string, string>;
}
