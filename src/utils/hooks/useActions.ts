import { countryActions } from '@/store/slices/country/country.slice';
import { imageActions } from '@/store/slices/image/image.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const allActions = {
  ...countryActions,
  ...imageActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(allActions, dispatch);
};
