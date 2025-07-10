export interface IBookItemResponse {
  id: string;
  volumeInfo: {
    title: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

export interface IBooksListResponse {
  items: IBookItemResponse[];
}
