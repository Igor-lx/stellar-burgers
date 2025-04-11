import { configureStore, combineSlices } from '@reduxjs/toolkit';

import { userSlice } from './slices/userSlice';
import { burgerConstructorSlice } from './slices/burgerConstructorSlice';
import { ingredientsSlice } from './slices/burgerIngredientsSlice';
import { feedSlice } from './slices/feedpageSlice';
import { ordersHistorySlice } from './slices/ordersHistorySlice';
import { orderSlice } from './slices/orderSlice';

export const rootReducer = combineSlices(
  userSlice,
  burgerConstructorSlice,
  ingredientsSlice,
  feedSlice,
  ordersHistorySlice,
  orderSlice
);

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
