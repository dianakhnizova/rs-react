// Checkbox.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { vi } from 'vitest';

describe('Checkbox', () => {
  it('Renders with a label', () => {
    render(<Checkbox label="Accept Terms" />);
    expect(screen.getByText('Accept Terms')).toBeInTheDocument();
  });

  it('Fires onChange when clicked', () => {
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(handleChange).toHaveBeenCalled();
  });
});
