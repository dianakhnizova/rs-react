import { render, screen } from '@testing-library/react';
import { ProductsSection } from './ProductsSection';
import { vi } from 'vitest';
import { Props } from './components/books-list/BooksList';

const setLoading = vi.fn();
const setError = vi.fn();
const onClose = vi.fn();

let callHandlers = false;

vi.mock('./components/products-header/ProductsHeader', () => ({
  ProductsHeader: () => <div data-testid="products-header" />,
}));

vi.mock('./components/books-list/BooksList', () => ({
  BooksList: (props: Props) => {
    if (callHandlers) {
      props.setLoading(true);
      props.setError('error');
      props.onClose();
    }

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

  beforeEach(() => {
    vi.clearAllMocks();
    callHandlers = false;
  });

  it('renders ProductsHeader and BooksList', () => {
    render(<ProductsSection {...mockProps} />);

    expect(screen.getByTestId('products-header')).toBeInTheDocument();
    expect(screen.getByTestId('books-list')).toBeInTheDocument();
  });

  it('passes searchTerm to BooksList', () => {
    render(<ProductsSection {...mockProps} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('passes all required props to BooksList', () => {
    const testProps = {
      searchTerm: 'TypeScript',
      setLoading,
      onClose,
      isLoading: true,
      setError,
    };

    render(<ProductsSection {...testProps} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('calls handler props from BooksList', () => {
    callHandlers = true;

    render(
      <ProductsSection
        searchTerm="test"
        setLoading={setLoading}
        onClose={onClose}
        isLoading={false}
        setError={setError}
      />
    );

    expect(setLoading).toHaveBeenCalledWith(true);
    expect(setError).toHaveBeenCalledWith('error');
    expect(onClose).toHaveBeenCalled();
  });
});
