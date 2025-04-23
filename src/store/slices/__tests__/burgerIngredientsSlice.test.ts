import { generateIngredient } from '../../../utils/test-utils';
import { TIngredient } from '../../../utils/types';
import {
  ingredientsSlice,
  fetchIngredients,
  IngredientsState
} from '../burgerIngredientsSlice';

describe('ingredientsSlice', () => {
  let initialState: IngredientsState;
  const sampleIngredients: TIngredient[] = [
    generateIngredient('Test Sauce', 'sauce'),
    generateIngredient('Test Bun', 'bun'),
    generateIngredient('Test Main', 'main')
  ];

  beforeEach(() => {
    initialState = { loading: false, list: [] };
  });

  it('должен устанавливать loading true при pending', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.pending('')
    );
    expect(state.loading).toBe(true);
    expect(state.list).toEqual([]);
  });

  it('должен записывать список и сбрасывать loading при fulfilled', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.fulfilled(sampleIngredients, '')
    );
    expect(state.loading).toBe(false);
    expect(state.list).toEqual(sampleIngredients);
  });

  it('должен сбрасывать loading при rejected', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.rejected(new Error(), '')
    );
    expect(state.loading).toBe(false);
    expect(state.list).toEqual([]);
  });
});
