import { render, screen } from '@testing-library/react';
import { App } from './App';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';

describe('Root entry rendering', () => {
  it('renders App inside ErrorBoundary without crashing', () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
});

describe('Root entry rendering', () => {
  it('renders App inside ErrorBoundary without crashing', () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the main app title', () => {
    render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );

    expect(screen.getByText(/your library/i)).toBeInTheDocument();
  });
});
