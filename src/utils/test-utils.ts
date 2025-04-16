import { Action } from '@reduxjs/toolkit';
import { burgerConstructorSlice } from '../store/slices/burgerConstructorSlice';
import { ingredientsSlice } from '../store/slices/burgerIngredientsSlice';
import feedSlice from '../store/slices/feedpageSlice';
import { ordersHistorySlice } from '../store/slices/ordersHistorySlice';

import { orderSlice } from '../store/slices/orderSlice';
import { userSlice } from '../store/slices/userSlice';
import { TIngredient } from './types';

const slices = {
  user: userSlice,
  ingredients: ingredientsSlice,
  burgerConstructor: burgerConstructorSlice,
  feed: feedSlice,
  ordersHistory: ordersHistorySlice,
  order: orderSlice
};

export function getExpectedInitialState(action: Action = { type: '@@INIT' }) {
  return Object.fromEntries(
    Object.entries(slices).map(([key, slice]) => [
      key,
      slice.reducer(undefined, action)
    ])
  );
}

/* ----------------------------------------------*/

export const generateIngredient = (name: string, type: string): TIngredient => {
  const id = `${type}-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

  return {
    _id: id,
    name,
    type,
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 1,
    price: 1,
    image: 'image.png',
    image_mobile: 'image_mobile.png',
    image_large: 'image_large.png'
  };
};
