import { render, screen } from '@testing-library/react';
import { InputForm } from './InputForm';
import { Variant } from '@/sources/enums';
import type { InputFields } from '@/sources/interfaces';
import { useForm } from 'react-hook-form';

describe('InputForm', () => {
  it('renders default Input with label', () => {
    render(<InputForm htmlFor="username" label="Username" />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  });

  it('applies correct variant class', () => {
    render(
      <InputForm htmlFor="email" label="Email" variant={Variant.SECONDARY} />
    );

    const input = screen.getByLabelText(/email/i);

    expect(input.className).toContain('secondary');
  });

  it('shows error message if provided', () => {
    render(
      <InputForm htmlFor="email" label="Email" errorMessage="Invalid email" />
    );

    expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
  });

  it('works with react-hook-form register', () => {
    const Wrapper = () => {
      const { register } = useForm<InputFields>();

      return <InputForm htmlFor="email" label="Email" register={register} />;
    };

    render(<Wrapper />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
