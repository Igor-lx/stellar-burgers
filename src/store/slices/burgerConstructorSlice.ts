import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface BurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

export const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<TConstructorIngredient>) {
      state.bun = action.payload;
    },
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<number>) {
      state.ingredients = state.ingredients.filter(
        (_, index) => index !== action.payload
      );
    },
    moveIngredient(
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = state.ingredients;

      [ingredients[fromIndex], ingredients[toIndex]] = [
        ingredients[toIndex],
        ingredients[fromIndex]
      ];
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    selectConstructorItems: (state: BurgerConstructorState) => state
  }
});

export const { selectConstructorItems } = burgerConstructorSlice.selectors;

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
