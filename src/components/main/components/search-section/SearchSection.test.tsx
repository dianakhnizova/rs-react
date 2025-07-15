import { SearchSection } from './SearchSection';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('SearchSection - rendering', () => {
  it('Renders search input and search button', () => {
    render(<SearchSection onSearch={vi.fn()} />);

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });
});
