import { generateOrder, generateFeed } from '../../../utils/test-utils';
import { TOrder, TOrdersData } from '../../../utils/types';
import {
  ordersHistorySlice,
  getOrdersHistoryThunk
} from '../ordersHistorySlice';

describe('ordersHistorySlice', () => {
  let initialState: ReturnType<typeof ordersHistorySlice.getInitialState>;
  let sampleOrder1: TOrder;
  let sampleOrder2: TOrder;
  let sampleFeed: TOrdersData;

  beforeEach(() => {
    initialState = ordersHistorySlice.getInitialState();
    sampleOrder1 = generateOrder(1234);
    sampleOrder2 = generateOrder(5678);
    sampleFeed = generateFeed([sampleOrder1, sampleOrder2]);
  });

  it('должен возвращать корректное начальное состояние', () => {
    expect(initialState.isLoading).toBe(false);
    expect(initialState.ordersHistory).toEqual([]);
  });

  it('должен устанавливать isLoading в true при pending', () => {
    const state = ordersHistorySlice.reducer(
      initialState,
      getOrdersHistoryThunk.pending('')
    );
    expect(state.isLoading).toBe(true);
  });

  it('должен записывать ordersHistory и сбрасывать isLoading при fulfilled', () => {
    const state = ordersHistorySlice.reducer(
      initialState,
      getOrdersHistoryThunk.fulfilled(sampleFeed.orders, '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.ordersHistory).toEqual(sampleFeed.orders);
  });

  it('должен сбрасывать isLoading при rejected', () => {
    const state = ordersHistorySlice.reducer(
      initialState,
      getOrdersHistoryThunk.rejected(new Error(), '')
    );
    expect(state.isLoading).toBe(false);
  });
});
