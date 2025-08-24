import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from './Modal';
import { messages } from '@/sources/messages';
import { vi } from 'vitest';

describe('Modal', () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
    const portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'root-portal');
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('does not render when isOpen = false', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders when isOpen = true', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('calls onClose when clicking overlay', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );

    fireEvent.click(screen.getByTestId('popup'));
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when pressing ESC', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });

  it('focuses inside modal on open', async () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <input placeholder="Name" />
      </Modal>
    );

    const input = await screen.findByPlaceholderText('Name');

    expect(document.activeElement).toBe(input);
  });

  it('returns focus to last active element after close', () => {
    const button = document.createElement('button');
    button.textContent = 'open';
    document.body.appendChild(button);
    button.focus();

    const { rerender } = render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    rerender(<Modal isOpen={false} onClose={onClose} />);

    expect(document.activeElement).toBe(button);
  });

  it('renders close button with correct label', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Content</p>
      </Modal>
    );

    const closeBtn = screen.getByRole('button', {
      name: messages.button.closeButton,
    });

    expect(closeBtn).toBeInTheDocument();
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });
});
