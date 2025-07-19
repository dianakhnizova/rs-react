import { prepareBooksList } from './prepareBooksList';
import { messages } from '@/sources/messages';
import type { BookData } from '@/sources/types';

describe('prepareBooksList', () => {
  it('returns books with titles uppercased', () => {
    const input: BookData[] = [
      {
        id: '1',
        title: 'TITLE TEST 1',
        description: 'test description 2',
        image: 'image1.jpg',
      },
      {
        id: '2',
        title: 'TITLE TEST 2',
        description: 'test description 3',
        image: 'image2.jpg',
      },
    ];

    const result = prepareBooksList(input);

    expect(result).toEqual([
      {
        id: '1',
        title: 'TITLE TEST 1',
        description: 'test description 2',
        image: 'image1.jpg',
      },
      {
        id: '2',
        title: 'TITLE TEST 2',
        description: 'test description 3',
        image: 'image2.jpg',
      },
    ]);
  });

  it('uses fallback title when title is empty', () => {
    const input: BookData[] = [
      {
        id: '3',
        title: '',
        description: 'No title book',
        image: 'image3.jpg',
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
        description: 'test description 4',
        image: 'img.jpg',
      },
    ];

    const result = prepareBooksList(input);
    expect(result[0].id).toBe('4');
    expect(result[0].description).toBe('test description 4');
    expect(result[0].image).toBe('img.jpg');
  });

  it('returns empty array if input is empty', () => {
    expect(prepareBooksList([])).toEqual([]);
  });
});
