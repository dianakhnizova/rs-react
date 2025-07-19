import { render, screen } from '@testing-library/react';
import { ProductsSection } from './ProductsSection';
import { vi } from 'vitest';
import { Props } from './components/books-list/BooksList';

const setLoading = vi.fn();
const setError = vi.fn();
const onClose = vi.fn();

vi.mock('./components/products-header/ProductsHeader', () => ({
  ProductsHeader: () => <div data-testid="products-header" />,
}));

vi.mock('./components/books-list/BooksList', () => ({
  BooksList: (props: Props) => {
    return <div data-testid="books-list">{props.searchTerm}</div>;
  },
}));

describe('ProductsSection', () => {
  const mockProps = {
    searchTerm: 'React',
    setLoading,
    onClose,
    isLoading: false,
    setError,
  };

  it('Renders ProductsHeader and BooksList', () => {
    render(<ProductsSection {...mockProps} />);

    expect(screen.getByTestId('products-header')).toBeInTheDocument();
    expect(screen.getByTestId('books-list')).toBeInTheDocument();
  });

  it('Passes searchTerm to BooksList', () => {
    render(<ProductsSection {...mockProps} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
