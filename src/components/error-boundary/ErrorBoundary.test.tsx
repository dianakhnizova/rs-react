import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, beforeAll, afterAll, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';
import userEvent from '@testing-library/user-event';
import { messages as popupMessages } from '../popup/messages';
import { messages as errorBoundaryMessages } from './messages';
import { useState } from 'react';

let consoleErrorMock: ReturnType<typeof vi.spyOn>;

beforeAll(() => {
  consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  consoleErrorMock.mockRestore();
});

const ProblemChild = () => {
  throw new Error('Test crash');
};

describe('ErrorBoundary', () => {
  it('Displays fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/an error has occurred/i)).toBeInTheDocument();
    expect(screen.getByText(/test crash/i)).toBeInTheDocument();
  });

  it('Logs error to console', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(consoleErrorMock).toHaveBeenCalled();
  });

  it('Renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe content')).toBeInTheDocument();
  });

  it('Resets error state and calls onReset when handleReset is triggered', async () => {
    const onReset = vi.fn();

    const Wrapper = () => {
      const [showProblem, setShowProblem] = useState(true);

      return (
        <ErrorBoundary
          onReset={() => {
            onReset();
            setShowProblem(false);
          }}
        >
          {showProblem ? <ProblemChild /> : <div>Recovered content</div>}
        </ErrorBoundary>
      );
    };

    render(<Wrapper />);

    const closeBtn = await screen.findByRole('button', {
      name: popupMessages.closeButton,
    });
    await userEvent.click(closeBtn);

    await waitFor(() => {
      expect(
        screen.queryByText(errorBoundaryMessages.titleBoundaryError)
      ).not.toBeInTheDocument();
    });

    expect(onReset).toHaveBeenCalled();
    expect(screen.getByText('Recovered content')).toBeInTheDocument();
  });
});
