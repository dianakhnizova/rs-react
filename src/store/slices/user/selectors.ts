import type { TypeRootState } from '@/store/store';

export const selectUser = (state: TypeRootState) => state.user.userData;
