import { configureStore, combineSlices } from '@reduxjs/toolkit';

/* IMPORT SLICES */

export const rootReducer = combineSlices();
/* SLICES */

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
