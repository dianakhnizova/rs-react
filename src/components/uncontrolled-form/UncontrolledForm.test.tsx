import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { vi } from 'vitest';
import { store } from '@/store/store';
import { UncontrolledForm } from './UncontrolledForm';
import { act } from 'react';

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
      ],
      refs,
    };
  },
}));

vi.mock('../input-form/InputForm', () => ({
  InputForm: ({ label, htmlFor, errorMessage, inputRef }: any) => (
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

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('id', 'name');

    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('id', 'email');

    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('id', 'password');
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

  it('allows user to change input values', () => {
    render(
      <Provider store={store}>
        <UncontrolledForm />
      </Provider>
    );

    const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/Email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /Password/i
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });

    expect(nameInput.value).toBe('Alice');
    expect(emailInput.value).toBe('alice@example.com');
    expect(passwordInput.value).toBe('Password123!');
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

  it('allows user to type in input fields', () => {
    render(
      <Provider store={store}>
        <UncontrolledForm />
      </Provider>
    );

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      /password/i
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Alice' } });
    fireEvent.change(emailInput, { target: { value: 'alice@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'StrongPass1!' } });

    expect(nameInput.value).toBe('Alice');
    expect(emailInput.value).toBe('alice@example.com');
    expect(passwordInput.value).toBe('StrongPass1!');
  });

  it('displays validation errors for invalid data', async () => {
    // Override mock for invalid data
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
        ],
        refs: {
          nameRef: { current: { value: '' } }, // Invalid: empty name
          ageRef: { current: { value: '15' } }, // Invalid: age below minimum
          emailRef: { current: { value: 'invalid-email' } }, // Invalid: not an email
          passwordRef: { current: { value: 'weak' } }, // Invalid: too short
          confirmPasswordRef: { current: { value: 'different' } }, // Invalid: doesn't match
          genderMaleRef: { current: { checked: true, value: 'male' } },
          genderFemaleRef: { current: { checked: false, value: 'female' } },
          acceptTermsRef: { current: { checked: false } }, // Invalid: not checked
          countryRef: { current: { value: '' } }, // Invalid: empty
          imageRef: { current: { files: [] } },
        },
      }),
    }));

    render(
      <Provider store={store}>
        <UncontrolledForm />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });

    // Simulate form submission
    await act(async () => {
      fireEvent.click(submitButton);
    });

    // Check for specific error messages (adjust based on your userSchema)
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
    expect(
      screen.getByText(/email must be a valid email/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/password must be at least/i)).toBeInTheDocument();
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    expect(screen.getByText(/terms must be accepted/i)).toBeInTheDocument();
    expect(screen.getByText(/country is required/i)).toBeInTheDocument();

    // Verify addUserData was not called due to validation errors
    expect(mockAddUserData).not.toHaveBeenCalled();
  });
});
