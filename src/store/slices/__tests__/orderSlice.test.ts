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

describe('orderSlice', () => {
  let initialState: OrderState;
  let sampleOrder1: TOrder;
  let sampleOrder2: TOrder;

  beforeEach(() => {
    initialState = { fetchStatus: 'idle', order: null };
    sampleOrder1 = generateOrder(1);
    sampleOrder2 = generateOrder(2);
  });

  describe('fetchOrder', () => {
    it('должен устанавливать fetchStatus в loading при pending', () => {
      const state = orderSlice.reducer(
        initialState,
        fetchOrder.pending('', [])
      );
      expect(state.fetchStatus).toBe('loading');
    });

    it('должен устанавливать fetchStatus в failed и очищать order при rejected', () => {
      const state = orderSlice.reducer(
        initialState,
        fetchOrder.rejected(new Error(), '', [])
      );
      expect(state.fetchStatus).toBe('failed');
      expect(state.order).toBeNull();
    });

    it('должен записывать order и устанавливать fetchStatus в succeeded при fulfilled', () => {
      const response: TNewOrderResponse = {
        success: true,
        order: sampleOrder1,
        name: `Тестовый заказ #${sampleOrder1.number}`
      };
      const state = orderSlice.reducer(
        initialState,
        fetchOrder.fulfilled(response, '', [])
      );
      expect(state.fetchStatus).toBe('succeeded');
      expect(state.order).toEqual(sampleOrder1);
    });
  });

  describe('getOrderByNum', () => {
    it('должен устанавливать fetchStatus в loading при pending', () => {
      const state = orderSlice.reducer(
        initialState,
        getOrderByNum.pending('', 1234)
      );
      expect(state.fetchStatus).toBe('loading');
    });

    it('должен устанавливать fetchStatus в failed и очищать order при rejected', () => {
      const state = orderSlice.reducer(
        initialState,
        getOrderByNum.rejected(new Error(), '', 1234)
      );
      expect(state.fetchStatus).toBe('failed');
      expect(state.order).toBeNull();
    });

    it('должен записывать order и устанавливать fetchStatus в succeeded при fulfilled', () => {
      const response: TOrderResponse = {
        success: true,
        orders: [sampleOrder2]
      };
      const state = orderSlice.reducer(
        initialState,
        getOrderByNum.fulfilled(response, '', 1234)
      );
      expect(state.fetchStatus).toBe('succeeded');
      expect(state.order).toEqual(sampleOrder2);
    });
  });

  it('должен очищать order и сбрасывать fetchStatus при clearOrder', () => {
    const preloadedState: OrderState = {
      fetchStatus: 'succeeded',
      order: sampleOrder2
    };
    const state = orderSlice.reducer(preloadedState, clearOrder());
    expect(state.fetchStatus).toBe('idle');
    expect(state.order).toBeNull();
  });
});
