import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetch',
  getIngredientsApi
);

export interface IngredientsState {
  loading: boolean;
  list: TIngredient[];
}

const initialState: IngredientsState = {
  loading: false,
  list: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredientsList: (state: IngredientsState) => state.list,
    selectIngredientsLoading: (state: IngredientsState) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.list = action.payload;
        }
      );
  }
});

export const { selectIngredientsList, selectIngredientsLoading } =
  ingredientsSlice.selectors;
