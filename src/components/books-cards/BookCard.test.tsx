import { render, screen } from '@testing-library/react';
import { BookCard } from './BookCard';
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
});
