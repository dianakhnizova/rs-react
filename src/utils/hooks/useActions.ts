import { sortActions } from '@/store/slices/sort/sort.slice';
import { searchTermActions } from '@/store/slices/search-term/searchTerm.slice';
import { columnActions } from '@/store/slices/selected-column/selectedColumn.slice';
import { yearActions } from '@/store/slices/year/year.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const allActions = {
  ...columnActions,
  ...sortActions,
  ...searchTermActions,
  ...yearActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
