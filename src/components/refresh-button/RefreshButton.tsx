import { bookApi } from '@/api/book.api';
import { Button } from '../button/Button';
import { messages } from './messages';
import { useDispatch } from 'react-redux';

export const RefreshButton = () => {
  const dispatch = useDispatch();

  const handleRefreshButton = () => {
    dispatch(bookApi.util.invalidateTags([{ type: 'Books' }]));
  };
  return (
    <Button onClick={handleRefreshButton}>{messages.refreshButton}</Button>
  );
};
