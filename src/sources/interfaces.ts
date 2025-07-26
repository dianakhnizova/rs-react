export interface IBookSearchResult {
  key: string;
  title: string;
  first_sentence?: string | string[];
  cover_i?: number;
}

export interface IAuthorRef {
  author: {
    key: string;
  };
}

export interface IBookItemResponse {
  key: string;
  title: string;
  description?: string | { value: string };
  first_publish_date?: string;
  authors?: IAuthorRef[];
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
