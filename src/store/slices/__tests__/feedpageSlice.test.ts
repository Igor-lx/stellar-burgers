import { TNewOrderResponse, TOrderResponse } from '../../../utils/burger-api';
import { generateOrder } from '../../../utils/test-utils';
import { TOrder } from '../../../utils/types';
import {
  OrderState,
  fetchOrder,
  orderSlice,
  getOrderByNum,
  clearOrder
} from '../orderSlice';

describe('orderSlice', () => {
  let initialState: OrderState;
  const mockOrder1: TOrder = generateOrder(1);
  const mockOrder2: TOrder = generateOrder(2);

  beforeEach(() => {
    initialState = {
      fetchStatus: 'idle',
      order: null
    };
  });

  describe('fetchOrder', () => {
    it('fetchStatus: loading при статусе pending', () => {
      const action = fetchOrder.pending('', []);
      const state = orderSlice.reducer(initialState, action);

      expect(state.fetchStatus).toBe('loading');
    });

    it('fetchStatus: failed и очиcтка order при статусе rejected', () => {
      const testError = new Error('test error message');
      const action = fetchOrder.rejected(testError, '', []);
      const state = orderSlice.reducer(initialState, action);

      expect(state.fetchStatus).toBe('failed');
      expect(state.order).toBeNull();
    });

    it('fetchStatus: succeeded и обновление order при статусе fulfilled', () => {
      const response: TNewOrderResponse = {
        success: true,
        order: mockOrder1,
        name: `Тестовый заказ #${mockOrder1.number}`
      };
      const action = fetchOrder.fulfilled(response, '', []);
      const state = orderSlice.reducer(initialState, action);

      expect(state.fetchStatus).toBe('succeeded');
      expect(state.order).toEqual(mockOrder1);
    });
  });

  describe('getOrderByNum', () => {
    it('getStatus: loading при статусе pending', () => {
      const action = getOrderByNum.pending('', 1234);
      const state = orderSlice.reducer(initialState, action);

      expect(state.fetchStatus).toBe('loading');
    });

    it('getStatus: failed и очистка order при статусе rejected', () => {
      const testError = new Error('test error message');
      const action = getOrderByNum.rejected(testError, '', 1234);
      const state = orderSlice.reducer(initialState, action);

      expect(state.fetchStatus).toBe('failed');
      expect(state.order).toBeNull();
    });

    it('getStatus: succeeded и обновление order при статусе fulfilled', () => {
      const response: TOrderResponse = {
        success: true,
        orders: [mockOrder2]
      };
      const action = getOrderByNum.fulfilled(response, '', 1234);
      const state = orderSlice.reducer(initialState, action);

      expect(state.fetchStatus).toBe('succeeded');
      expect(state.order).toEqual(mockOrder2);
    });
  });

  describe('clearOrder', () => {
    it('очистка order и перевод fetchStatus в idle', () => {
      const preloadedState: OrderState = {
        fetchStatus: 'succeeded',
        order: mockOrder2
      };
      const action = clearOrder();
      const state = orderSlice.reducer(preloadedState, action);

      expect(state.fetchStatus).toBe('idle');
      expect(state.order).toBeNull();
    });
  });
});
