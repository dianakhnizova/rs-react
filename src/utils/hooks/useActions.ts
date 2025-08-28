import { countryActions } from '@/store/slices/country/country.slice';
import { columnActions } from '@/store/slices/selected-column/selectedColumn.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const allActions = {
  ...columnActions,
  ...countryActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
