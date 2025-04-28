import { generateIngredient } from '../../../utils/test-utils';
import { TIngredient, TConstructorIngredient } from '../../../utils/types';
import {
  burgerConstructorSlice,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  BurgerConstructorState
} from '../burgerConstructorSlice';
import { v4 as uuidSample } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('test-uuid')
}));

describe('burgerConstructorSlice', () => {
  const bunSample: TIngredient = generateIngredient('Test Bun', 'bun');
  const ingredient1: TIngredient = generateIngredient('Test Sauce', 'sauce');
  const ingredient2: TIngredient = generateIngredient('Test Main', 'main');

  let initialStateSample: BurgerConstructorState;

  beforeEach(() => {
    initialStateSample = {
      bun: null,
      ingredients: []
    };
  });

  it('добавление булки', () => {
    const state = burgerConstructorSlice.reducer(
      initialStateSample,
      addIngredient({
        ...bunSample,
        id: uuidSample()
      } as TConstructorIngredient)
    );
    expect(state.bun).toEqual({ ...bunSample, id: uuidSample() });
    expect(state.ingredients).toEqual(initialStateSample.ingredients);
  });

  it('добавление ингредиента', () => {
    const state = burgerConstructorSlice.reducer(
      initialStateSample,
      addIngredient({
        ...ingredient1,
        id: uuidSample()
      } as TConstructorIngredient)
    );
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({
      ...ingredient1,
      id: uuidSample()
    });
    expect(state.bun).toEqual(initialStateSample.bun);
  });

  it('удаление ингредиента', () => {
    const state = burgerConstructorSlice.reducer(
      {
        bun: null,
        ingredients: [
          { ...ingredient1, id: uuidSample() },
          { ...ingredient2, id: uuidSample() }
        ]
      },
      removeIngredient(0)
    );
    expect(state.ingredients).toEqual([{ ...ingredient2, id: uuidSample() }]);
  });

  it('перемещение ингредиента', () => {
    const state = burgerConstructorSlice.reducer(
      {
        bun: null,
        ingredients: [
          { ...ingredient1, id: uuidSample() },
          { ...ingredient2, id: uuidSample() }
        ]
      },
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(state.ingredients).toEqual([
      { ...ingredient2, id: uuidSample() },
      { ...ingredient1, id: uuidSample() }
    ]);
  });

  it('очистка конструктора', () => {
    const state = burgerConstructorSlice.reducer(
      {
        bun: { ...bunSample, id: uuidSample() },
        ingredients: [
          { ...ingredient1, id: uuidSample() },
          { ...ingredient2, id: uuidSample() }
        ]
      },
      clearConstructor()
    );
    expect(state).toEqual(initialStateSample);
  });
});
