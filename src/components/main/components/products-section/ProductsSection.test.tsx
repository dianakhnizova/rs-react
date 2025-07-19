import { render, screen } from '@testing-library/react';
import { ProductsSection } from './ProductsSection';
import { vi } from 'vitest';

vi.mock('./components/products-header/ProductsHeader', () => ({
  ProductsHeader: () => <div data-testid="products-header" />,
}));

vi.mock('./components/books-list/BooksList', () => ({
  BooksList: ({ searchTerm }: { searchTerm: string }) => (
    <div data-testid="books-list">{searchTerm}</div>
  ),
}));

describe('ProductsSection', () => {
  const mockProps = {
    searchTerm: 'React',
    setLoading: vi.fn(),
    onClose: vi.fn(),
    isLoading: false,
    setError: vi.fn(),
  };

  it('renders ProductsHeader and BooksList', () => {
    render(<ProductsSection {...mockProps} />);

    expect(screen.getByTestId('products-header')).toBeInTheDocument();
    expect(screen.getByTestId('books-list')).toBeInTheDocument();
  });

  it('passes searchTerm to BooksList', () => {
    render(<ProductsSection {...mockProps} />);

    expect(screen.getByText('React')).toBeInTheDocument();
  });
});

it('passes all required props to BooksList', () => {
  const testProps = {
    searchTerm: 'TypeScript',
    setLoading: vi.fn(),
    onClose: vi.fn(),
    isLoading: true,
    setError: vi.fn(),
  };

  render(<ProductsSection {...testProps} />);

  expect(screen.getByText('TypeScript')).toBeInTheDocument();
});
