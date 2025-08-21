import type { TypeRootState } from '@/store/store';

export const selectImage = (state: TypeRootState) => state.image.fileBase64;
