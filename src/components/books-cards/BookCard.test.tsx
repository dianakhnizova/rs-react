import { render, screen } from '@testing-library/react';
import { BookCard } from './BookCard';
import { MemoryRouter } from 'react-router-dom';
import BookPlaceholder from '@/assets/img-placeholder.jpg';
import { IBookData } from '@/sources/interfaces';
import { ThemeProvider } from '@/utils/ThemeContext';
import { Provider } from 'react-redux';
import { store, TypeRootState } from '@/store/store';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import * as useActionsModule from '@/utils/hooks/useActions';
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import * as appSelectorModule from '@/utils/hooks/useAppSelector';

const mockBook: IBookData = {
  id: '1',
  title: 'Test Book',
  image: 'test.jpg',
  bookDetails: {
    description: 'Test description',
    authors: 'Test Author',
    year: '2020',
    pages: '100',
  },
};

const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <MemoryRouter>
      <Provider store={store}>
        <ThemeProvider>{ui}</ThemeProvider>
      </Provider>
    </MemoryRouter>
  );

const addItemMock = vi.fn() as unknown as ActionCreatorWithPayload<
  IBookData,
  'cart/addItem'
>;
const removeItemMock = vi.fn() as unknown as ActionCreatorWithPayload<
  { id: string },
  'cart/removeItem'
>;
const clearCartMock =
  vi.fn() as unknown as ActionCreatorWithoutPayload<'cart/clearCart'>;

describe('BookCard', () => {
  it('Displays full data correctly', () => {
    renderWithProviders(
      <BookCard
        book={mockBook}
        details={[
          { value: 'Test Description', className: 'desc' },
          { value: 'Test Author', className: 'author' },
          { value: 100, className: 'pageCount' },
          { value: 'Book', className: 'printType' },
        ]}
      />
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
    const bookWithoutImage = { ...mockBook, image: '' };

    renderWithProviders(<BookCard book={bookWithoutImage} details={[]} />);

    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', BookPlaceholder);
    expect(image).toHaveAttribute('alt', 'Test Book');
  });

  it('Skips rendering details with falsy values', () => {
    renderWithProviders(
      <BookCard
        book={mockBook}
        details={[
          { value: 'Visible Detail', className: 'desc' },
          { value: '', className: 'author' },
          { value: '', className: 'pageCount' },
          { value: '', className: 'printType' },
          { value: 0, className: 'year' },
        ]}
      />
    );

    expect(screen.getByText(/Visible Detail/i)).toBeInTheDocument();
    expect(screen.queryByText(/author/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/pageCount/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/printType/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^0$/)).not.toBeInTheDocument();
  });

  it('Calls removeItem when remove button is clicked in flyout', async () => {
    const user = userEvent.setup();

    vi.spyOn(useActionsModule, 'useActions').mockReturnValue({
      addItem: addItemMock,
      removeItem: removeItemMock,
      clearCart: clearCartMock,
    });

    renderWithProviders(<BookCard book={mockBook} isFlyout />);

    const removeButton = screen.getByRole('button');

    await user.click(removeButton);

    expect(removeItemMock).toHaveBeenCalledWith({ id: '1' });
  });

  it('Calls addItem when checkbox is checked and book is not in cart', async () => {
    const user = userEvent.setup();

    vi.spyOn(appSelectorModule, 'useAppSelector').mockImplementation(selector =>
      selector({
        cart: {
          selected: {},
          cart: [],
        },
      } as unknown as TypeRootState)
    );

    renderWithProviders(<BookCard book={mockBook} isSelected={true} />);

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);

    expect(addItemMock).toHaveBeenCalledWith(mockBook);
  });

  it('Calls removeItem when checkbox is unchecked and book is in cart', async () => {
    const user = userEvent.setup();

    vi.spyOn(appSelectorModule, 'useAppSelector').mockImplementation(selector =>
      selector({
        cart: {
          selected: { [mockBook.id]: mockBook },
          cart: [mockBook],
        },
      } as unknown as TypeRootState)
    );

    renderWithProviders(<BookCard book={mockBook} isSelected />);

    const checkbox = screen.getByRole('checkbox');

    await user.click(checkbox);

    expect(removeItemMock).toHaveBeenCalledWith({ id: '1' });
  });
});
