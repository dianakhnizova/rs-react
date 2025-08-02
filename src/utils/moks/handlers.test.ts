import { setupServer } from 'msw/node';
import { handlers } from './handlers';
import { beforeAll, afterAll, afterEach, describe, it, expect } from 'vitest';
import {
  IAuthorResponse,
  IBookItemResponse,
  IBooksListResponse,
} from '@/sources/interfaces';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MSW handlers', () => {
  it('Returns books list from /api/books', async () => {
    const res = await fetch('http://localhost:3000/api/books?title=harry');
    const data = (await res.json()) as IBooksListResponse;

    expect(res.status).toBe(200);
    expect(data.docs).toHaveLength(1);
    expect(data.docs[0].title).toBe('Book harry');
    expect(data.numFound).toBe(1);
  });

  it('Returns book details from /api/works/:id.json', async () => {
    const res = await fetch('http://localhost:3000/api/works/1.json');
    const data = (await res.json()) as IBookItemResponse;

    expect(res.status).toBe(200);
    expect(data.title).toBe('Test Book');
    if (typeof data.description === 'object' && data.description !== null) {
      expect(data.description.value).toBe('Test description');
    }
    expect(data.authors?.[0].author.key).toBe('/authors/1');
  });

  it('Returns author name from /api/authors/:id', async () => {
    const res = await fetch('http://localhost:3000/api/authors/1');
    const data = (await res.json()) as IAuthorResponse;

    expect(res.status).toBe(200);
    expect(data.name).toBe('Test Author');
  });
});
