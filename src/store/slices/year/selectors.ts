import { TypeRootState } from '@/store/store';

export const selectYear = (state: TypeRootState) => state.year;

export const selectSelectedYear = (state: TypeRootState) => state.year.year;
