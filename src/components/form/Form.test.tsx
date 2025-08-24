import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from './Form';
import { messages } from '@/sources/messages';
import { vi } from 'vitest';

describe('Form component', () => {
  it('renders children correctly', () => {
    render(
      <Form onSubmit={vi.fn()}>
        <div>Child content</div>
      </Form>
    );

    expect(screen.getByText(/child content/i)).toBeInTheDocument();
  });

  it('renders submit button with correct text', () => {
    render(<Form onSubmit={vi.fn()}>Child</Form>);

    expect(
      screen.getByRole('button', { name: messages.button.submitButton })
    ).toBeInTheDocument();
  });

  it('calls onSubmit when form is submitted', () => {
    const handleSubmit = vi.fn(e => e.preventDefault());
    render(<Form onSubmit={handleSubmit}>Child</Form>);

    fireEvent.submit(screen.getByRole('form'));

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('disables submit button when isDisabled is true', () => {
    render(
      <Form onSubmit={vi.fn()} isDisabled>
        Child
      </Form>
    );

    expect(
      screen.getByRole('button', { name: messages.button.submitButton })
    ).toBeDisabled();
  });
});
