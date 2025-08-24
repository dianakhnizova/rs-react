import { render, screen } from '@testing-library/react';
import { InfoBar } from './InfoBar';
import { InputType, PasswordStrength } from '@/sources/enums';

describe('InfoBar', () => {
  it('displays error message when provided', () => {
    render(<InfoBar htmlFor="username" errorMessage="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('clears error message when removed', () => {
    const { rerender } = render(
      <InfoBar htmlFor="username" errorMessage="Invalid input" />
    );

    expect(screen.getByText('Invalid input')).toBeInTheDocument();

    rerender(<InfoBar htmlFor="username" />);
    expect(screen.queryByText('Invalid input')).not.toBeInTheDocument();
  });

  it('renders password strength when htmlFor=PASSWORD and passwordStrength is set', () => {
    render(
      <InfoBar
        htmlFor={InputType.PASSWORD}
        passwordStrength={PasswordStrength.STRONG}
      />
    );

    expect(screen.getByText(PasswordStrength.STRONG)).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeTruthy;
  });

  it('does not render strength if htmlFor != PASSWORD', () => {
    render(
      <InfoBar htmlFor="email" passwordStrength={PasswordStrength.MEDIUM} />
    );

    expect(screen.queryByText(PasswordStrength.MEDIUM)).not.toBeInTheDocument();
  });

  it('does not render strength if passwordStrength is missing', () => {
    render(<InfoBar htmlFor={InputType.PASSWORD} />);
    expect(screen.queryByText(/weak|medium|strong/i)).not.toBeInTheDocument();
  });
});
