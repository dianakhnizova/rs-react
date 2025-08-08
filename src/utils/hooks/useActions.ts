import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/slices/cart/cart.slice';
import { paginationActions } from '@/store/slices/pagination/pagination.slice';
import { searchActions } from '@/store/slices/search/search.slice';

const allActions = {
  ...cartActions,
  ...searchActions,
  ...paginationActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
