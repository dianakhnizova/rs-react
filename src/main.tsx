import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.scss';
import { App } from './App';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
