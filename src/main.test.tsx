import { describe, it, expect } from 'vitest';
import { screen, act } from '@testing-library/react';

describe('Main test', () => {
  it('Renders the app without crashing', async () => {
    const root = document.createElement('div');
    root.id = 'root';
    document.body.append(root);

    await act(async () => {
      await import('./main');
    });

    const banner = await screen.findByRole('banner');
    expect(banner).toBeInTheDocument();
  });
});
