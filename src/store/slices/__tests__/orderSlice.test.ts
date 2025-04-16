import { TNewOrderResponse, TOrderResponse } from '../../../utils/burger-api';
import { generateOrder } from '../../../utils/test-utils';
import { TOrder } from '../../../utils/types';
import {
  OrderState,
  orderSlice,
  fetchOrder,
  getOrderByNum,
  clearOrder
} from '../orderSlice';

describe('Проверка работы orderSlice', () => {
  const initialState: OrderState = {
    fetchStatus: 'idle',
    order: null
  };

  const mockOrder1: TOrder = generateOrder(1);
  const mockOrder2: TOrder = generateOrder(2);

  describe('fetchOrder', () => {
    it('изменяет fetchStatus на "loading" при отправке pending', () => {
      const newState = orderSlice.reducer(
        { ...initialState },
        fetchOrder.pending('', [])
      );
      expect(newState.fetchStatus).toBe('loading');
    });

    it('ставит fetchStatus в "failed" при отправке rejected', () => {
      const testError = new Error('test error message');
      const newState = orderSlice.reducer(
        { ...initialState },
        fetchOrder.rejected(testError, '', [])
      );
      expect(newState.fetchStatus).toBe('failed');
      expect(newState.order).toBeNull();
    });

    it('обновляет order и fetchStatus в "succeeded" при отправке fulfilled', () => {
      const response: TNewOrderResponse = {
        success: true,
        order: mockOrder1,
        name: 'test'
      };
      const newState = orderSlice.reducer(
        { ...initialState },
        fetchOrder.fulfilled(response, '', [])
      );
      expect(newState.fetchStatus).toBe('succeeded');
      expect(newState.order).toEqual(mockOrder1);
    });
  });

  // Тестируем getOrderByNum
  describe('getOrderByNum', () => {
    it('изменяет fetchStatus на "loading" при отправке pending', () => {
      const newState = orderSlice.reducer(
        { ...initialState },
        getOrderByNum.pending('', 1234)
      );
      expect(newState.fetchStatus).toBe('loading');
    });

    it('ставит fetchStatus в "failed" при отправке rejected', () => {
      const testError = new Error('test error message');
      const newState = orderSlice.reducer(
        { ...initialState },
        getOrderByNum.rejected(testError, '', 1234)
      );
      expect(newState.fetchStatus).toBe('failed');
      expect(newState.order).toBeNull();
    });

    it('обновляет order и fetchStatus в "succeeded" при отправке fulfilled', () => {
      const response: TOrderResponse = {
        success: true,
        orders: [mockOrder2]
      };
      const newState = orderSlice.reducer(
        { ...initialState },
        getOrderByNum.fulfilled(response, '', 1234)
      );
      expect(newState.fetchStatus).toBe('succeeded');
      expect(newState.order).toEqual(mockOrder2);
    });

    it('очищает order и fetchStatus при вызове clearOrder', () => {
      const preloadedState: OrderState = {
        fetchStatus: 'succeeded',
        order: mockOrder2
      };

      const newState = orderSlice.reducer(preloadedState, clearOrder());

      expect(newState.fetchStatus).toBe('idle');
      expect(newState.order).toBeNull();
    });
  });
});
