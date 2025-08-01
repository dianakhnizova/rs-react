import { TypeRootState } from '@/store/store';

export const selectCart = (state: TypeRootState) => state.cart.cart;
export const selectSelectedBook = (id: string) => (state: TypeRootState) =>
  state.cart.cart.some(selectedBook => selectedBook.id === id);
export const selectItemIsInCart = (state: TypeRootState) =>
  state.cart.cart.length > 0;
