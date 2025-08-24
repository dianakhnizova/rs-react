import { countryActions } from '@/store/slices/country/country.slice';
import { userActions } from '@/store/slices/user/user.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const allActions = {
  ...countryActions,
  ...userActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
