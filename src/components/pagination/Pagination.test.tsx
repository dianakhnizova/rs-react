import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { vi } from 'vitest';
import { ThemeProvider } from '@/utils/ThemeContext';

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe('Pagination component', () => {
  it('Renders correctly with given props', () => {
    renderWithTheme(
      <Pagination
        currentPage={2}
        totalPages={5}
        handlePrev={vi.fn()}
        handleNext={vi.fn()}
      />
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
});
