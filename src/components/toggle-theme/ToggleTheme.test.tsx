import { render, screen } from '@testing-library/react';
import { ToggleTheme } from './ToggleTheme';
import userEvent from '@testing-library/user-event';
import { Theme } from '@/sources/enums';
import { useTheme } from '@/utils/ThemeContext';
import styles from './ToggleTheme.module.scss';
import { vi, type Mock } from 'vitest';

vi.mock('@/utils/ThemeContext', async () => {
  const actual = await vi.importActual<typeof import('@/utils/ThemeContext')>(
    '@/utils/ThemeContext'
  );

  return {
    ...actual,
    useTheme: vi.fn(),
  };
});

describe('ToggleTheme', () => {
  const mockToggleTheme = vi.fn();

  const renderComponent = (theme: Theme) => {
    (useTheme as Mock).mockReturnValue({
      theme,
      toggleTheme: mockToggleTheme,
    });

    render(<ToggleTheme />);
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('Renders button with light class when theme is LIGHT', () => {
    renderComponent(Theme.LIGHT);

    const button = screen.getByRole('button');

    expect(button).toHaveClass(styles.toggleLightButton);
  });

  it('Does not have light class when theme is DARK', () => {
    renderComponent(Theme.DARK);

    const button = screen.getByRole('button');

    expect(button).not.toHaveClass(styles.toggleLightButton);
  });

  it('Calls toggleTheme when clicked', async () => {
    renderComponent(Theme.DARK);

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
