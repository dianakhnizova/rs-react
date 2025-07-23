import { render, screen } from '@testing-library/react';
import { BookCard } from './BookCard';
import { messages } from './messages';
import placeholder from '@/assets/img-placeholder.jpg';

describe('BookCard', () => {
  it('Displays full data correctly', () => {
    render(
      <BookCard
        name="Test Book"
        description="Test Description"
        image="test.jpg"
      />
    );

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
  });

  it('Displays fallback description if missing', () => {
    render(
      <BookCard
        name="No Description for Book"
        description=""
        image="test.jpg"
      />
    );

    expect(screen.getByText(messages.titleNotDescription)).toBeInTheDocument();
  });

  it('Displays placeholder image if image is missing', () => {
    render(
      <BookCard name="No Image for Book" description="description" image="" />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', placeholder);
  });
});
