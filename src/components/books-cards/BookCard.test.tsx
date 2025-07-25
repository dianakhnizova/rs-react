import { render, screen } from '@testing-library/react';
import { BookCard } from './BookCard';
import { messages } from './messages';
import placeholder from '@/assets/img-placeholder.jpg';
import { MemoryRouter } from 'react-router-dom';

describe('BookCard', () => {
  it('Displays full data correctly', () => {
    render(
      <MemoryRouter>
        <BookCard
          id="123"
          title="Test Book"
          description="Test Description"
          image="test.jpg"
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
  });

  it('Displays fallback description if missing', () => {
    render(
      <MemoryRouter>
        <BookCard
          id="1234"
          title="No Description for Book"
          description=""
          image="test.jpg"
        />
      </MemoryRouter>
    );

    expect(screen.getByText(messages.titleNotDescription)).toBeInTheDocument();
  });

  it('Displays placeholder image if image is missing', () => {
    render(
      <MemoryRouter>
        <BookCard
          id="12345"
          title="No Image for Book"
          description="description"
          image=""
        />
      </MemoryRouter>
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', placeholder);
  });
});
