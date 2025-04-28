import { generateIngredient } from '../../../utils/test-utils';
import { TIngredient } from '../../../utils/types';
import {
  ingredientsSlice,
  fetchIngredients,
  IngredientsState
} from '../burgerIngredientsSlice';

describe('ingredientsSlice', () => {
  const ingredients: TIngredient[] = [
    generateIngredient('Test Sauce', 'sauce'),
    generateIngredient('Test Bun', 'bun'),
    generateIngredient('Test Main', 'main')
  ];

  let initialStateSample: IngredientsState;

  beforeEach(() => {
    initialStateSample = {
      loading: false,
      list: []
    };
  });

  it('status: pending', () => {
    const action = fetchIngredients.pending('');
    const state = ingredientsSlice.reducer(initialStateSample, action);

    expect(state.loading).toBe(true);
    expect(state.list).toEqual([]);
  });

  it('status:  fulfilled', () => {
    const action = fetchIngredients.fulfilled(ingredients, '');
    const state = ingredientsSlice.reducer(initialStateSample, action);

    expect(state.loading).toBe(false);
    expect(state.list).toEqual(ingredients);
  });

  it('status: rejected', () => {
    const action = fetchIngredients.rejected(null, '');
    const state = ingredientsSlice.reducer(initialStateSample, action);

    expect(state.loading).toBe(false);
    expect(state.list).toEqual([]);
  });
});
