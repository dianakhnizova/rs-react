import { render, screen } from '@testing-library/react';
import { BookCard } from './BookCard';
import { messages } from './messages';
import placeholder from '@/assets/img-placeholder.jpg';

describe('BookCard', () => {
  it('Displays full data correctly', () => {
    render(
      <ul>
        <BookCard
          name="Test Book"
          description="Test Description"
          image="test.jpg"
        />
      </ul>
    );

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
  });

  it('Displays fallback description if missing', () => {
    render(
      <ul>
        <BookCard name="No Desc Book" description="" image="test.jpg" />
      </ul>
    );

    expect(screen.getByText(messages.titleNotDescription)).toBeInTheDocument();
  });

  it('Displays placeholder image if image is missing', () => {
    render(
      <ul>
        <BookCard name="No Image Book" description="desc" image="" />
      </ul>
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', placeholder);
  });
});
