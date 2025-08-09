import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/utils/ThemeContext';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Pagination component', () => {
  it('Renders correctly with given props', () => {
    renderWithTheme(
      <Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />
    );

    expect(screen.getByTestId('page-number')).toHaveTextContent('Page 2 of 5');

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0];
    const nextButton = buttons[1];

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeEnabled();
    expect(nextButton).toBeEnabled();
  });

  it('Calls onPageChange with currentPage - 1 when Prev button is clicked', async () => {
    const onPageChange = vi.fn();

    renderWithTheme(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0];
    await userEvent.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('Calls onPageChange with currentPage + 1 when Next button is clicked', async () => {
    const onPageChange = vi.fn();

    renderWithTheme(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[1];
    await userEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
