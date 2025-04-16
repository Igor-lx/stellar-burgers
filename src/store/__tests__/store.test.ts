import { rootReducer } from '../store';
import { getExpectedInitialState } from '../../utils/test-utils';

describe('тест rootReducer', () => {
  it('инициализирует корректное начальное состояние', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(getExpectedInitialState());
  });

  it('возвращает корректное состояние при unknown экшене', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, unknownAction);
    expect(state).toEqual(getExpectedInitialState(unknownAction));
  });
});
