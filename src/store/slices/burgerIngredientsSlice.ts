import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetch',
  async () => getIngredientsApi()
);

interface IngredientsState {
  loading: boolean;
  list: TIngredient[];
}

const initialState: IngredientsState = {
  loading: false,
  list: []
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectAll: (state: IngredientsState) => state.list,
    selectLoading: (state: IngredientsState) => state.loading
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

export const { selectAll, selectLoading } = ingredientsSlice.selectors;
