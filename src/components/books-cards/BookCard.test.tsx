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
          image="test.jpg"
          details={[
            { value: 'Test Description', className: 'desc' },
            { value: 'Test Author', className: 'author' },
            { value: 100, className: 'pageCount' },
            { value: 'Book', className: 'printType' },
          ]}
        />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: /test book/i });
    expect(link).toHaveAttribute('href', '/123');

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'test.jpg');
    expect(image).toHaveAttribute('alt', 'Test Book');

    expect(
      screen.getByText(text => text.includes('Test Description'))
    ).toBeInTheDocument();
    expect(screen.getByText(/Test Author/i)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
    expect(screen.getAllByText(/Book/i)).toHaveLength(2);
  });
});
