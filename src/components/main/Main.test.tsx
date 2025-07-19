import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Main } from './Main';
import { vi } from 'vitest';
import type { FC, MouseEventHandler, ReactNode } from 'react';

let mockSetLoading: (val: boolean) => void;
let mockSetError: (msg: string) => void;

vi.mock('./components/search-section/SearchSection', () => ({
  SearchSection: (({ onSearch }: { onSearch: (term: string) => void }) => (
    <div data-testid="search-section" onClick={() => onSearch('test')}>
      SearchSection
    </div>
  )) as FC<{ onSearch: (term: string) => void }>,
}));

vi.mock('./components/products-section/ProductsSection', () => ({
  ProductsSection: (({
    setLoading,
    setError,
  }: {
    setLoading: (val: boolean) => void;
    setError: (msg: string) => void;
  }) => {
    mockSetLoading = setLoading;
    mockSetError = setError;

    return (
      <div data-testid="products-section">
        ProductsSection
        <button
          data-testid="trigger-loading"
          onClick={() => setLoading(true)}
        />
        <button
          data-testid="trigger-error"
          onClick={() => setError('Something went wrong')}
        />
      </div>
    );
  }) as FC<{
    setLoading: (val: boolean) => void;
    setError: (msg: string) => void;
  }>,
}));

vi.mock('../popup/Popup', () => ({
  Popup: (({ children, isOpen }: { children: ReactNode; isOpen: boolean }) =>
    isOpen ? <div data-testid="popup">{children}</div> : undefined) as FC<{
    children: ReactNode;
    isOpen: boolean;
  }>,
}));

vi.mock('../spinner/Spinner', () => ({
  Spinner: (({ isLoading }: { isLoading: boolean }) =>
    isLoading ? <div data-testid="spinner">Spinner</div> : undefined) as FC<{
    isLoading: boolean;
  }>,
}));

vi.mock('../button/Button', () => ({
  Button: (({
    children,
    ...props
  }: {
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
    className: string;
  }) => (
    <button {...props} data-testid="error-button">
      {children}
    </button>
  )) as FC<{
    children: ReactNode;
    onClick: MouseEventHandler<HTMLButtonElement>;
    className: string;
  }>,
}));

vi.mock('./messages', () => ({
  messages: {
    errorButton: 'Simulate Error',
  },
}));

describe('Main component', () => {
  it('Handles search term from localStorage on initial load', () => {
    localStorage.setItem('searchInput', 'react-books');

    render(<Main />);

    expect(screen.getByTestId('products-section')).toBeInTheDocument();
    expect(localStorage.getItem('searchInput')).toBe('react-books');
  });
});

describe('Main component - extended', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('Calls onSearch and updates localStorage', () => {
    render(<Main />);
    fireEvent.click(screen.getByTestId('search-section'));

    expect(localStorage.getItem('searchInput')).toBe('test');
  });

  it('Displays popup when loading is true', () => {
    render(<Main />);
    fireEvent.click(screen.getByTestId('trigger-loading'));

    expect(screen.getByTestId('popup')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('Shows error message when setError is called', () => {
    render(<Main />);
    fireEvent.click(screen.getByTestId('trigger-error'));

    expect(screen.getByTestId('popup')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('Throws error when simulate error button is clicked', () => {
    expect(() => {
      render(<Main />);
      fireEvent.click(screen.getByTestId('error-button'));
    }).toThrow('Test render error');
  });
});

describe('Main component - Manages search term state correctly', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('updates search term state and localStorage when search is triggered', () => {
    render(<Main />);

    fireEvent.click(screen.getByTestId('search-section'));

    expect(localStorage.getItem('searchInput')).toBe('test');
  });
});

describe('Main component - Updates component state based on API responses', () => {
  it('removes loading and clears error after successful API response', async () => {
    render(<Main />);

    mockSetLoading(false);
    mockSetError('');

    await waitFor(() =>
      expect(screen.getByTestId('products-section')).toBeInTheDocument()
    );

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });
});
