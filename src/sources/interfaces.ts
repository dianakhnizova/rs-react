export interface IBookItemResponse {
  id: string;
  volumeInfo: {
    title: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    authors?: string;
    pageCount?: number | string;
    printType?: string;
  };
}

export interface IBooksListResponse {
  totalItems: number;
  items: IBookItemResponse[];
}

export interface IApiErrorResponse {
  error: {
    message: string;
  };
}
