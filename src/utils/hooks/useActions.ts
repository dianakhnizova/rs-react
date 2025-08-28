import { countryActions } from '@/store/slices/country/country.slice';
import { searchTermActions } from '@/store/slices/search-term/searchTerm.slice';
import { columnActions } from '@/store/slices/selected-column/selectedColumn.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const allActions = {
  ...columnActions,
  ...countryActions,
  ...searchTermActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
