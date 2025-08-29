import { TypeRootState } from '@/store/store';

export const selectYears = (state: TypeRootState) => state.year.years;

export const selectSelectedYear = (state: TypeRootState) =>
  state.year.selectedYear;
