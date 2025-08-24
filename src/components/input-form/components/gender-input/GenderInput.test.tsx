import { render, screen, fireEvent } from '@testing-library/react';
import { GenderInput } from './GenderInput';

describe('GenderInput', () => {
  it('renders both male and female options and allows selecting', () => {
    render(<GenderInput htmlFor="gender" label="Gender" />);

    const maleRadio = screen.getByRole('radio', {
      name: 'Male',
    }) as HTMLInputElement;
    const femaleRadio = screen.getByRole('radio', {
      name: 'Female',
    }) as HTMLInputElement;

    expect(maleRadio).toBeInTheDocument();
    expect(femaleRadio).toBeInTheDocument();

    fireEvent.click(maleRadio);
    expect(maleRadio.checked).toBe(true);
    expect(femaleRadio.checked).toBe(false);

    fireEvent.click(femaleRadio);
    expect(femaleRadio.checked).toBe(true);
    expect(maleRadio.checked).toBe(false);
  });

  it('renders error message if provided', () => {
    const errorMessage = 'Gender is required';

    render(
      <GenderInput
        htmlFor="gender"
        label="Gender"
        errorMessage={errorMessage}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
