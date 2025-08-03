import { cartReducer, cartActions } from '../cart/cart.slice';
import type { IBookData } from '@/sources/interfaces';

describe('cartSlice', () => {
  const mockBook: IBookData = {
    id: '123',
    title: 'Test Book',
    image: 'test.jpg',

    bookDetails: {
      authors: 'Diana',
      description: 'Test Description',
      year: '2025',
    },
  };

  it('Should return the initial state', () => {
    expect(cartReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      cart: [],
    });
  });

  it('Should handle addItem', () => {
    const nextState = cartReducer(undefined, cartActions.addItem(mockBook));

    expect(nextState.cart).toHaveLength(1);
    expect(nextState.cart[0]).toEqual(mockBook);
  });

  it('Should handle removeItem', () => {
    const stateWithItem = { cart: [mockBook] };
    const nextState = cartReducer(
      stateWithItem,
      cartActions.removeItem({ id: '123' })
    );

    expect(nextState.cart).toHaveLength(0);
  });

  it('Should handle clearCart', () => {
    const stateWithItems = { cart: [mockBook, { ...mockBook, id: '456' }] };
    const nextState = cartReducer(stateWithItems, cartActions.clearCart());

    expect(nextState.cart).toHaveLength(0);
  });
});
