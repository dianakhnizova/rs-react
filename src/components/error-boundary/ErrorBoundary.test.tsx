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

it('Renders children when no error occurs', () => {
  render(
    <ErrorBoundary>
      <div>Safe content</div>
    </ErrorBoundary>
  );

  expect(screen.getByText('Safe content')).toBeInTheDocument();
});

describe('ErrorBoundary handleReset', () => {
  it('resets error state and calls onReset if provided', () => {
    const onResetMock = vi.fn();

    const boundary = new ErrorBoundary({
      onReset: onResetMock,
      children: <></>,
    });

    boundary.setState({
      hasError: true,
      errorMessage: 'Error happened',
    });

    boundary.handleReset();

    expect(boundary.state.hasError).toBe(false);
    expect(boundary.state.errorMessage).toBeUndefined();
    expect(onResetMock).toHaveBeenCalled();
  });

  it('resets error state without onReset', () => {
    const boundary = new ErrorBoundary({ children: <></> });

    boundary.setState({
      hasError: true,
      errorMessage: 'Error happened',
    });

    boundary.handleReset();

    expect(boundary.state.hasError).toBe(false);
    expect(boundary.state.errorMessage).toBeUndefined();
  });
});
