import { getBookByIdQueryFn } from '../getBookByIdQueryFn';
import { fetchAuthorNames } from '../fetchAuthorNames';
import { transformGetBookByIdResponse } from '../transformGetBookByIdResponse';
import { type IBookData, type IBookItemResponse } from '@/sources/interfaces';
import {
  type BaseQueryApi,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { vi } from 'vitest';

vi.mock('../fetchAuthorNames', () => ({
  fetchAuthorNames: vi.fn(),
}));

vi.mock('../transformGetBookByIdResponse', () => ({
  transformGetBookByIdResponse: vi.fn(),
}));

const mockedFetchAuthorNames = fetchAuthorNames as ReturnType<typeof vi.fn>;
const mockedTransform = transformGetBookByIdResponse as ReturnType<
  typeof vi.fn
>;

describe('getBookByIdQueryFn', () => {
  const apiMock = {} as BaseQueryApi;

  const baseQueryMock: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Returns book data if everything succeeds', async () => {
    const mockBookResponse: IBookItemResponse = {
      key: '/works/test-id',
      title: 'Test Book',
      authors: [{ author: { key: '/authors/1' } }],
    };

    const mockBookData: IBookData = {
      id: 'test-id',
      title: 'Test Book',
      image: 'cover',
      bookDetails: {
        description: 'desc',
        authors: 'Author 1',
        first_publish_year: '2023',
      },
    };

    (baseQueryMock as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: mockBookResponse,
    });

    mockedFetchAuthorNames.mockResolvedValue(['Author 1']);
    mockedTransform.mockReturnValue(mockBookData);

    const result = await getBookByIdQueryFn(
      'test-id',
      apiMock,
      {},
      baseQueryMock
    );

    expect(baseQueryMock).toHaveBeenCalledWith(
      '/works/test-id.json',
      apiMock,
      {}
    );
    expect(fetchAuthorNames).toHaveBeenCalledWith(
      ['/authors/1'],
      baseQueryMock,
      apiMock
    );
    expect(transformGetBookByIdResponse).toHaveBeenCalledWith(
      mockBookResponse,
      ['Author 1']
    );
    expect(result).toEqual({ data: mockBookData });
  });

  it('Returns error when book is not found', async () => {
    const error: FetchBaseQueryError = {
      status: 404,
      data: 'Not Found',
    };

    (baseQueryMock as ReturnType<typeof vi.fn>).mockResolvedValue({ error });

    const result = await getBookByIdQueryFn(
      'wrong-id',
      apiMock,
      {},
      baseQueryMock
    );

    expect(result).toEqual({ error });
  });

  it('Returns custom error when book data is missing', async () => {
    (baseQueryMock as ReturnType<typeof vi.fn>).mockResolvedValue({
      data: undefined,
    });

    const result = await getBookByIdQueryFn(
      'empty-id',
      apiMock,
      {},
      baseQueryMock
    );

    expect(result).toEqual({
      error: {
        status: 'CUSTOM_ERROR',
        error: 'No book data available',
        data: 'No book data',
      },
    });
  });
});
