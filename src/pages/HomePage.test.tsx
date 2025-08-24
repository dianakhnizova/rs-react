import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HomePage } from './HomePage';
import { vi } from 'vitest';

vi.mock('@/components/uncontrolled-form/UncontrolledForm', () => ({
  UncontrolledForm: ({ onSuccess }: { onSuccess: () => void }) => (
    <button onClick={onSuccess}>Mock UncontrolledForm Submit</button>
  ),
}));

vi.mock('@/components/controlled-form/ControlledForm', () => ({
  ControlledForm: ({ onSuccess }: { onSuccess: () => void }) => (
    <button onClick={onSuccess}>Mock ControlledForm Submit</button>
  ),
}));

vi.mock('@/components/user-list/UserList', () => ({
  UserList: () => <div data-testid="user-list">Mock UserList</div>,
}));

describe('HomePage', () => {
  it('renders title and buttons', () => {
    render(<HomePage />);

    expect(
      screen.getByRole('heading', { name: /user registration/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /uncontrolled/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /react/i })).toBeInTheDocument();
  });

  it('opens uncontrolled form modal and submits', () => {
    render(<HomePage />);

    fireEvent.click(screen.getByRole('button', { name: /uncontrolled/i }));

    const formSubmitBtn = screen.getByText(/Mock UncontrolledForm Submit/i);
    expect(formSubmitBtn).toBeInTheDocument();

    fireEvent.click(formSubmitBtn);
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
  });

  it('opens controlled form modal and submits', () => {
    render(<HomePage />);

    fireEvent.click(screen.getByRole('button', { name: /react/i }));

    const formSubmitBtn = screen.getByText(/Mock ControlledForm Submit/i);
    expect(formSubmitBtn).toBeInTheDocument();

    fireEvent.click(formSubmitBtn);
    expect(screen.getByTestId('user-list')).toBeInTheDocument();
  });
});
