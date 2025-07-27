import { prepareBooksList } from './prepareBooksList';
import { messages } from '@/sources/messages';
import type { BookData } from '@/sources/types';
import ImgPlaceholder from '@/assets/img-placeholder.jpg';

describe('prepareBooksList', () => {
  it('returns books with titles uppercased', () => {
    const input: BookData[] = [
      {
        id: '1',
        title: 'TITLE TEST 1',
        image: ImgPlaceholder,
      },
      {
        id: '2',
        title: 'TITLE TEST 2',
        image: ImgPlaceholder,
      },
    ];

    const result = prepareBooksList(input);

    expect(result).toEqual([
      {
        id: '1',
        title: 'TITLE TEST 1',
        image: ImgPlaceholder,
      },
      {
        id: '2',
        title: 'TITLE TEST 2',
        image: ImgPlaceholder,
      },
    ]);
  });

  it('uses fallback title when title is empty', () => {
    const input: BookData[] = [
      {
        id: '3',
        title: '',
        image: ImgPlaceholder,
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
        image: ImgPlaceholder,
      },
    ];

    const result = prepareBooksList(input);
    expect(result[0].id).toBe('4');
  });

  it('returns empty array if input is empty', () => {
    expect(prepareBooksList([])).toEqual([]);
  });
});
