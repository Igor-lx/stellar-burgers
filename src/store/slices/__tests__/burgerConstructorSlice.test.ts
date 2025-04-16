import { generateIngredient } from '../../../utils/test-utils';
import { TConstructorIngredient, TIngredient } from '../../../utils/types';
import {
  burgerConstructorSlice,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} from '../burgerConstructorSlice';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: () => 'test-uuid'
}));

describe('burgerConstructorSlice', () => {
  const bunSample: TIngredient = generateIngredient('Test Bun', 'bun');
  const ingredient1: TIngredient = generateIngredient('Test Sauce', 'sauce');
  const ingredient2: TIngredient = generateIngredient('Test Main', 'main');

  it('добавление булки', () => {
    const state = burgerConstructorSlice.reducer(
      { bun: null, ingredients: [] },
      addIngredient({ ...bunSample, id: uuidv4() } as TConstructorIngredient)
    );
    expect(state.bun).toEqual({ ...bunSample, id: uuidv4() });
    expect(state.ingredients).toEqual([]);
  });

  it('добавление ингредиента', () => {
    const state = burgerConstructorSlice.reducer(
      { bun: null, ingredients: [] },
      addIngredient({
        ...ingredient1,
        id: uuidv4()
      } as TConstructorIngredient)
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({
      ...ingredient1,
      id: uuidv4()
    });
  });

  it('удаление ингредиента', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { ...ingredient1, id: uuidv4() },
        { ...ingredient2, id: uuidv4() }
      ]
    };
    const state = burgerConstructorSlice.reducer(
      initialState,
      removeIngredient(0)
    );
    expect(state.ingredients).toEqual([{ ...ingredient2, id: uuidv4() }]);
  });

  it('перемещение ингредиента', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { ...ingredient1, id: uuidv4() },
        { ...ingredient2, id: uuidv4() }
      ]
    };
    const state = burgerConstructorSlice.reducer(
      initialState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(state.ingredients).toEqual([
      { ...ingredient2, id: uuidv4() },
      { ...ingredient1, id: uuidv4() }
    ]);
  });

  it('очистка конструктора', () => {
    const initialState = {
      bun: { ...bunSample, id: uuidv4() },
      ingredients: [
        { ...ingredient1, id: uuidv4() },
        { ...ingredient2, id: uuidv4() }
      ]
    };
    const state = burgerConstructorSlice.reducer(
      initialState,
      clearConstructor()
    );
    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});
