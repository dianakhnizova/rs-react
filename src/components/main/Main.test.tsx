import { render, screen } from '@testing-library/react';
import { Main } from './Main';
import { vi } from 'vitest';
import type { FC, MouseEventHandler, ReactNode } from 'react';

vi.mock('./components/search-section/SearchSection', () => ({
  SearchSection: (({ onSearch }: { onSearch: (term: string) => void }) => (
    <div data-testid="search-section" onClick={() => onSearch('test')}>
      SearchSection
    </div>
  )) as FC<{ onSearch: (term: string) => void }>,
}));

vi.mock('./components/products-section/ProductsSection', () => ({
  ProductsSection: (() => (
    <div data-testid="products-section">ProductsSection</div>
  )) as FC,
}));

vi.mock('../popup/Popup', () => ({
  Popup: (({ children }: { children: ReactNode }) => (
    <div data-testid="popup">{children}</div>
  )) as FC<{ children: ReactNode }>,
}));

vi.mock('../spinner/Spinner', () => ({
  Spinner: (() => <div data-testid="spinner">Spinner</div>) as FC,
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
