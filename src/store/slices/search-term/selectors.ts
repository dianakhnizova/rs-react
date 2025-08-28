import { TypeRootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

const selectSearch = (state: TypeRootState) => state.searchTerm;

export const selectSearchTerm = createSelector(
  selectSearch,
  search => search.searchTerm
);
