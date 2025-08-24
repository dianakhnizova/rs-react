import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { store } from '@/store/store';
import { UncontrolledForm } from './UncontrolledForm';
import { InputFormProps } from '@/sources/interfaces';

const mockAddUserData = vi.fn();

vi.mock('@/utils/hooks/useInputFields', () => ({
  useInputFields: () => {
    const refs = {
      nameRef: { current: { value: 'John' } },
      ageRef: { current: { value: '30' } },
      emailRef: { current: { value: 'john@example.com' } },
      passwordRef: { current: { value: 'Password1!' } },
      confirmPasswordRef: { current: { value: 'Password1!' } },
      genderMaleRef: { current: { checked: true, value: 'male' } },
      genderFemaleRef: { current: { checked: false, value: 'female' } },
      acceptTermsRef: { current: { checked: true } },
      countryRef: { current: { value: 'USA' } },
      imageRef: { current: { files: [] } },
    };

    return {
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
      refs,
    };
  },
}));

vi.mock('../input-form/InputForm', () => ({
  InputForm: ({ label, htmlFor, errorMessage, inputRef }: InputFormProps) => (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      {errorMessage && <div>{errorMessage}</div>}
      <input id={htmlFor} ref={inputRef} />
    </div>
  ),
}));

vi.mock('@/utils/fileToBase64', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('base64content')),
}));

vi.mock('@/utils/hooks/useActions', () => ({
  useActions: () => ({
    addUserData: mockAddUserData,
  }),
}));

describe('UncontrolledForm', () => {
  it('renders all input fields correctly', () => {
    render(
      <Provider store={store}>
        <UncontrolledForm />
      </Provider>
    );

    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();

    expect(nameInput).toHaveAttribute('id', 'name');
    expect(emailInput).toHaveAttribute('id', 'email');
    expect(passwordInput).toHaveAttribute('id', 'password');
    expect(confirmPasswordInput).toHaveAttribute('id', 'confirmPassword');
  });

  it('renders submit button', () => {
    render(
      <Provider store={store}>
        <UncontrolledForm />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it('triggers submit event', () => {
    const handleSubmit = vi.fn();

    render(
      <form onSubmit={handleSubmit}>
        <UncontrolledForm />
      </form>
    );

    const button = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalled();
  });
});
