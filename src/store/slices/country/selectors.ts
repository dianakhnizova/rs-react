import { TypeRootState } from '@/store/store';

export const selectCountry = (state: TypeRootState) =>
  state.countries.countries;

export const selectSelectedSortOrder = (state: TypeRootState) =>
  state.countries.sortOrder;
