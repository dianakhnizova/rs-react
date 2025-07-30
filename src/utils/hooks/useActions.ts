import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/slices/cart/cart.slice';
import { selectionActions } from '@/store/slices/selection/selection.slice';
import { selectItemActions } from '@/store/slices/select-item/selectItem.slice';

const allActions = {
  ...cartActions,
  ...selectionActions,
  ...selectItemActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
