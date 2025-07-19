import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';
import { vi } from 'vitest';

describe('Button component', () => {
  it('renders button with provided text', () => {
    render(<Button>Click Me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">With Class</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
