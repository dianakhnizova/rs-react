import { TypeRootState } from '@/store/store';

export const selectCurrentPage = (state: TypeRootState) =>
  state.pagination.currentPage;
export const selectTotalItems = (state: TypeRootState) =>
  state.pagination.totalItems;
