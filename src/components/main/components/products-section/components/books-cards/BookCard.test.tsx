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

describe('BookCard - Data Display', () => {
  it('Displays item name and description correctly', () => {
    render(
      <ul>
        <BookCard
          name="test book"
          description="testing description"
          image="test.jpg"
        />
      </ul>
    );

    expect(screen.getByText('test book')).toBeInTheDocument();
    expect(screen.getByText('testing description')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'test book');
  });
});

it('Displays placeholder image and fallback text when all fields are empty', () => {
  render(
    <ul>
      <BookCard name="" description="" image="" />
    </ul>
  );

  expect(screen.getByText(messages.titleNotDescription)).toBeInTheDocument();

  const img = screen.getByAltText('');
  expect(img).toHaveAttribute('src', placeholder);
});
