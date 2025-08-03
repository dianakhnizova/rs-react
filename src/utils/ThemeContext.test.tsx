import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { Theme } from '@/sources/enums';
import { messages } from '@/sources/messages';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('Provides default theme as DARK', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme').textContent).toBe(Theme.DARK);
  });

  it('Toggles theme from DARK to LIGHT', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const themeSpan = screen.getByTestId('theme');
    expect(themeSpan.textContent).toBe(Theme.DARK);

    await user.click(screen.getByText('Toggle'));

    expect(themeSpan.textContent).toBe(Theme.LIGHT);
  });

  it('Throws error when useTheme is called outside provider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const BrokenComponent = () => {
      useTheme();
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      messages.errorThemeContext
    );
    spy.mockRestore();
  });
});
