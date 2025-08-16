'use client';

import { Button } from '../button/Button';
import { messages } from './messages';

const handleRefreshButton = () => {
  console.log('Refresh');
};

export const RefreshButton = () => {
  return (
    <Button onClick={handleRefreshButton}>{messages.refreshButton}</Button>
  );
};
