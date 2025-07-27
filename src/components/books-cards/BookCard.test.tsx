import { render, screen } from '@testing-library/react';
import { BookCard } from './BookCard';
import { MemoryRouter } from 'react-router-dom';
import BookPlaceholder from '@/assets/img-placeholder.jpg';

describe('BookCard', () => {
  it('Displays full data correctly', () => {
    render(
      <MemoryRouter>
        <BookCard
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

  it('Falls back to placeholder image if no image is provided', () => {
    render(
      <MemoryRouter>
        <BookCard title="No Image Book" image={undefined} details={[]} />
      </MemoryRouter>
    );

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', BookPlaceholder);
    expect(image).toHaveAttribute('alt', 'No Image Book');
  });
});
