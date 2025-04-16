import { burgerConstructorSlice } from '../store/slices/burgerConstructorSlice';
import { ingredientsSlice } from '../store/slices/burgerIngredientsSlice';
import feedSlice from '../store/slices/feedpageSlice';
import { ordersHistorySlice } from '../store/slices/ordersHistorySlice';

import { orderSlice } from '../store/slices/orderSlice';
import { userSlice } from '../store/slices/userSlice';

const slices = {
  user: userSlice,
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  feed: feedSlice,
  ordersHistory: ordersHistorySlice,
  order: orderSlice
};

type Action = { type: string };

export function getExpectedInitialState(action: Action = { type: '@@INIT' }) {
  return Object.fromEntries(
    Object.entries(slices).map(([key, slice]) => [
      key,
      slice.reducer(undefined, action)
    ])
  );
}
