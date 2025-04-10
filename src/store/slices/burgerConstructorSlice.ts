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

const generateUniqueId = (): string => `${Date.now()}-${Math.random()}`;

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TConstructorIngredient>) {
      const ingredient = { ...action.payload, id: generateUniqueId() };
      switch (ingredient.type) {
        case 'bun': {
          state.bun = ingredient;
          break;
        }
        default: {
          state.ingredients.push(ingredient);
          break;
        }
      }
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
    selectBurgerConstructorItems: (state: BurgerConstructorState) => state
  }
});

export const { selectBurgerConstructorItems } =
  burgerConstructorSlice.selectors;

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
