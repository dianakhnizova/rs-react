import { TypeRootState } from '@/store/store';

export const selectSelectedSortOrder = (state: TypeRootState) =>
  state.sort.sortOrder;
