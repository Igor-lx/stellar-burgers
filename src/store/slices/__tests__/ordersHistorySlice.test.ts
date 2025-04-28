import { generateOrder, generateFeed } from '../../../utils/test-utils';
import {
  ordersHistorySlice,
  getOrdersHistoryThunk
} from '../ordersHistorySlice';

describe('ordersHistorySlice', () => {
  const initialState = ordersHistorySlice.getInitialState();

  const mockOrder1 = generateOrder(1234);
  const mockOrder2 = generateOrder(5678);
  const mockOrdersHistory = generateFeed([mockOrder1, mockOrder2]);

  it('возврат начального состояния', () => {
    expect(initialState.isLoading).toBe(false);
    expect(initialState.ordersHistory).toEqual([]);
  });

  describe('getOrdersHistoryThunk', () => {
    it('ставит isLoading в true при статусе pending', () => {
      const state = ordersHistorySlice.reducer(
        initialState,
        getOrdersHistoryThunk.pending('')
      );
      expect(state.isLoading).toBe(true);
    });

    it('обновляет ordersHistory и ставит isLoading в false при статусе fulfilled', () => {
      const state = ordersHistorySlice.reducer(
        initialState,
        getOrdersHistoryThunk.fulfilled(mockOrdersHistory.orders, '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.ordersHistory).toEqual(mockOrdersHistory.orders);
    });

    it('ставит isLoading в false при статусе rejected', () => {
      const state = ordersHistorySlice.reducer(
        initialState,
        getOrdersHistoryThunk.rejected(new Error('Ошибка'), '')
      );
      expect(state.isLoading).toBe(false);
    });
  });
});
