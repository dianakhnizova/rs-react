import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { store } from '@/store/store';
import { ControlledForm } from './ControlledForm';

vi.mock('@/utils/hooks/useInputFields', () => ({
  useInputFields: () => ({
    inputFields: [
      { name: 'name', label: 'Name', type: 'text', htmlFor: 'name' },
      { name: 'email', label: 'Email', type: 'email', htmlFor: 'email' },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        htmlFor: 'password',
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        htmlFor: 'confirmPassword',
      },
    ],
  }),
}));

vi.mock('../input-form/InputForm', () => ({
  InputForm: ({ passwordStrength, label, htmlFor, errorMessage }: any) => (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      {passwordStrength !== undefined && (
        <div data-testid="password-strength">Strength: {passwordStrength}</div>
      )}
      {errorMessage && <div>{errorMessage}</div>}
      <input id={htmlFor} />
    </div>
  ),
}));

describe('ControlledForm', () => {
  it('renders input fields from useInputFields', () => {
    render(
      <Provider store={store}>
        <ControlledForm />
      </Provider>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });
});
