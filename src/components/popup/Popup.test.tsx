import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popup } from './Popup';
import { messages } from './messages';
import { describe, it, expect, vi } from 'vitest';

describe('Popup component', () => {
  it('Does not render when isOpen is false', () => {
    render(
      <Popup isOpen={false} onClose={vi.fn()}>
        <p>Hidden Content</p>
      </Popup>
    );

    expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
  });

  it('Renders content when isOpen is true', () => {
    render(
      <Popup isOpen={true} onClose={vi.fn()}>
        <p>Visible Content</p>
      </Popup>
    );

    expect(screen.getByText('Visible Content')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: messages.closeButton })
    ).toBeInTheDocument();
  });

  it('Calls onClose when overlay is clicked', async () => {
    const onCloseMock = vi.fn();
    render(
      <Popup isOpen={true} onClose={onCloseMock}>
        <p>Close Test</p>
      </Popup>
    );

    const overlay = screen.getByTestId('popup');
    await userEvent.click(overlay);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('Calls onClose when close button is clicked', async () => {
    const onCloseMock = vi.fn();
    render(
      <Popup isOpen={true} onClose={onCloseMock}>
        <p>Close Test</p>
      </Popup>
    );

    const button = screen.getByRole('button', { name: messages.closeButton });
    await userEvent.click(button);
    expect(onCloseMock).toHaveBeenCalled();
  });
});
