import { prepareBooksList } from './prepareBooksList';
import { messages } from '@/sources/messages';
import type { BookData } from '@/sources/types';

describe('prepareBooksList', () => {
  it('returns books with titles uppercased', () => {
    const input: BookData[] = [
      {
        id: '1',
        title: 'TITLE TEST 1',
      },
      {
        id: '2',
        title: 'TITLE TEST 2',
      },
    ];

    const result = prepareBooksList(input);

    expect(result).toEqual([
      {
        id: '1',
        title: 'TITLE TEST 1',
      },
      {
        id: '2',
        title: 'TITLE TEST 2',
      },
    ]);
  });

  it('uses fallback title when title is empty', () => {
    const input: BookData[] = [
      {
        id: '3',
        title: '',
      },
    ];

    const result = prepareBooksList(input);

    expect(result[0].title).toBe(messages.notFoundDataTitle);
  });

  it('preserves other book fields unchanged', () => {
    const input: BookData[] = [
      {
        id: '4',
        title: 'title test 5',
      },
    ];

    const result = prepareBooksList(input);
    expect(result[0].id).toBe('4');
  });

  it('returns empty array if input is empty', () => {
    expect(prepareBooksList([])).toEqual([]);
  });
});
