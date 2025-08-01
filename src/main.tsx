import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.scss';
import { App } from './App';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import { ThemeProvider } from './utils/ThemeContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
