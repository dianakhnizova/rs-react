export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    const err = error as { status?: number; data?: unknown; error?: string };

    if (err.status !== undefined && err.data !== undefined) {
      return `Error ${err.status}: ${JSON.stringify(err.data)}`;
    }

    if (typeof err.error === 'string') {
      return err.error;
    }
  }

  return '';
};
