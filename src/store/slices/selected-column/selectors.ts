import { TypeRootState } from '@/store/store';

export const selectColumns = (state: TypeRootState) => state.columns.columns;
