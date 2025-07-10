import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h2 className={styles.titleMain}>An error has occurred.</h2>
          <p className={styles.titleError}>
            Please reload the page or try again later.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
