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
import { v4 as uuid } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('test-uuid')
}));

describe('burgerConstructorSlice', () => {
  let initialState: BurgerConstructorState;
  const bunSample = generateIngredient('Test Bun', 'bun');
  const sauceSample = generateIngredient('Test Sauce', 'sauce');
  const mainSample = generateIngredient('Test Main', 'main');

  beforeEach(() => {
    initialState = { bun: null, ingredients: [] };
  });

  it('должен добавлять булку в состояние', () => {
    const action = addIngredient({
      ...bunSample,
      id: uuid()
    } as TConstructorIngredient);
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.bun).toEqual({ ...bunSample, id: uuid() });
    expect(state.ingredients).toEqual([]);
  });

  it('должен добавлять ингредиент в список', () => {
    const action = addIngredient({
      ...sauceSample,
      id: uuid()
    } as TConstructorIngredient);
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.ingredients).toEqual([{ ...sauceSample, id: uuid() }]);
    expect(state.bun).toBeNull();
  });

  it('должен удалять ингредиент по индексу', () => {
    const populated = {
      bun: null,
      ingredients: [
        { ...sauceSample, id: uuid() },
        { ...mainSample, id: uuid() }
      ]
    };
    const state = burgerConstructorSlice.reducer(
      populated,
      removeIngredient(0)
    );
    expect(state.ingredients).toEqual([{ ...mainSample, id: uuid() }]);
  });

  it('должен перемещать ингредиент из одного положения в другое', () => {
    const populated = {
      bun: null,
      ingredients: [
        { ...sauceSample, id: uuid() },
        { ...mainSample, id: uuid() }
      ]
    };
    const state = burgerConstructorSlice.reducer(
      populated,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    expect(state.ingredients).toEqual([
      { ...mainSample, id: uuid() },
      { ...sauceSample, id: uuid() }
    ]);
  });

  it('должен очищать конструктор', () => {
    const populated = {
      bun: { ...bunSample, id: uuid() },
      ingredients: [
        { ...sauceSample, id: uuid() },
        { ...mainSample, id: uuid() }
      ]
    };
    const state = burgerConstructorSlice.reducer(populated, clearConstructor());
    expect(state).toEqual(initialState);
  });
});
