import { render, screen } from '@testing-library/react';
import { describe, it, beforeAll, afterAll, vi } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

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
});

describe('ErrorBoundary - Catches and handles JavaScript errors in child components', () => {
  let consoleErrorMock: ReturnType<typeof vi.spyOn>;

  beforeAll(() => {
    consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it('Catches error from child and renders fallback UI', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/an error has occurred/i)).toBeInTheDocument();

    expect(screen.getByText(/test crash/i)).toBeInTheDocument();

    expect(consoleErrorMock).toHaveBeenCalled();
  });
});

describe('ErrorBoundary - Logs error to console', () => {
  it('Logs error to console when child throws', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(consoleErrorMock).toHaveBeenCalled();
    consoleErrorMock.mockRestore();
  });
});
