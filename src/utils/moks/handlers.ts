import { http } from 'msw';

export const handlers = [
  http.get('http://localhost:3000/api/books', ({ request }) => {
    const url = new URL(request.url);
    const title = url.searchParams.get('title');
    return new Response(
      JSON.stringify({
        docs: [
          {
            key: '/works/1',
            title: `Book ${title || 'fiction'}`,
            author_name: ['Author 1'],
            cover_i: 12_345,
            first_sentence: ['This is a test book.'],
            first_publish_year: 2020,
            edition_count: 5,
          },
        ],
        numFound: 1,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }),
  http.get('http://localhost:3000/api/works/:id.json', () => {
    return new Response(
      JSON.stringify({
        title: 'Test Book',
        authors: [{ author: { key: '/authors/1' } }],
        description: { value: 'Test description' },
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }),
  http.get('http://localhost:3000/api/authors/:id', () => {
    return new Response(JSON.stringify({ name: 'Test Author' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }),
];
