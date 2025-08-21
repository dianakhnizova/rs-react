import { countryActions } from '@/store/slices/country/country.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const allActions = {
  ...countryActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
