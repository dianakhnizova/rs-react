import { TypeRootState } from '@/store/store';

export const selectCountry = (state: TypeRootState) =>
  state.countries.countries;

export const selectSelectedCountry = (state: TypeRootState) =>
  state.countries.selectedCountry;
