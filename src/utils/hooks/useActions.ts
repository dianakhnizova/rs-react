import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/slices/cart/cart.slice';
import { searchTermActions } from '@/store/slices/search-term/search-term.slice';
import { paginationActions } from '@/store/slices/pagination/pagination.slice';

const allActions = {
  ...cartActions,
  ...searchTermActions,
  ...paginationActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
