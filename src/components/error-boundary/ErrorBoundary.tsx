import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';
import styles from './ErrorBoundary.module.css';
import { messages } from './messages';
import { Popup } from '../popup/Popup';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  errorMessage?: string;
}

export class ErrorBoundary extends Component<Props> {
  public state: State = {
    hasError: false,
    errorMessage: undefined,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, errorMessage: undefined });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Popup isOpen={this.state.hasError} onClose={this.handleReset}>
          <h2 className={styles.titleMain}>{messages.titleBoundaryError}</h2>
          <p className={styles.titleError}>
            {this.state.errorMessage || messages.reloadTitle}
          </p>
        </Popup>
      );
    }
    return this.props.children;
  }
}
