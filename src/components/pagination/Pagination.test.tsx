import { render, screen } from '@testing-library/react';
import { Pagination } from './Pagination';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Pagination component', () => {
  it('renders correctly with given props', () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />
    );

    expect(screen.getByTestId('page-number')).toHaveTextContent('Page: 2');

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0];
    const nextButton = buttons[1];

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(prevButton).toBeEnabled();
    expect(nextButton).toBeEnabled();
  });

  it('calls onPageChange with currentPage - 1 when Prev button is clicked', async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );

    const buttons = screen.getAllByRole('button');
    const prevButton = buttons[0];
    await userEvent.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with currentPage + 1 when Next button is clicked', async () => {
    const onPageChange = vi.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );

    const buttons = screen.getAllByRole('button');
    const nextButton = buttons[1];
    await userEvent.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
