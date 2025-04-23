import { generateOrder, generateFeed } from '../../../utils/test-utils';
import { TOrder, TOrdersData } from '../../../utils/types';
import feedSlice, { fetchFeed, fetchOrderByNumber } from '../feedpageSlice';

describe('feedSlice', () => {
  let initialState: ReturnType<typeof feedSlice.getInitialState>;
  let sampleOrder: TOrder;
  let sampleFeed: TOrdersData;

  beforeEach(() => {
    initialState = feedSlice.getInitialState();
    sampleOrder = generateOrder(1234);
    sampleFeed = generateFeed([sampleOrder]);
  });

  it('должен возвращать корректное начальное состояние', () => {
    expect(initialState.fetchStatus).toBe('idle');
    expect(initialState.feedData.orders).toEqual([]);
    expect(initialState.orderByNumber).toBeNull();
  });

  describe('fetchFeed', () => {
    it('должен устанавливать fetchStatus в loading при pending', () => {
      const state = feedSlice.reducer(initialState, fetchFeed.pending(''));
      expect(state.fetchStatus).toBe('loading');
    });

    it('должен записывать feedData и устанавливать fetchStatus в succeeded при fulfilled', () => {
      const state = feedSlice.reducer(
        initialState,
        fetchFeed.fulfilled(sampleFeed, '')
      );
      expect(state.fetchStatus).toBe('succeeded');
      expect(state.feedData).toEqual(sampleFeed);
    });

    it('должен очищать feedData и устанавливать fetchStatus в failed при rejected', () => {
      const preloaded = { ...initialState, feedData: sampleFeed };
      const state = feedSlice.reducer(
        preloaded,
        fetchFeed.rejected(new Error(), '')
      );
      expect(state.fetchStatus).toBe('failed');
      expect(state.feedData).toEqual({ orders: [], total: 0, totalToday: 0 });
    });
  });

  describe('fetchOrderByNumber', () => {
    it('должен очищать orderByNumber и устанавливать fetchStatus в loading при pending', () => {
      const preloaded = { ...initialState, orderByNumber: sampleOrder };
      const state = feedSlice.reducer(
        preloaded,
        fetchOrderByNumber.pending('', 1234)
      );
      expect(state.fetchStatus).toBe('loading');
      expect(state.orderByNumber).toBeNull();
    });

    it('должен записывать orderByNumber и устанавливать fetchStatus в succeeded при fulfilled', () => {
      const state = feedSlice.reducer(
        initialState,
        fetchOrderByNumber.fulfilled(sampleOrder, '', 1234)
      );
      expect(state.fetchStatus).toBe('succeeded');
      expect(state.orderByNumber).toEqual(sampleOrder);
    });

    it('должен очищать orderByNumber и устанавливать fetchStatus в failed при rejected', () => {
      const preloaded = { ...initialState, orderByNumber: sampleOrder };
      const state = feedSlice.reducer(
        preloaded,
        fetchOrderByNumber.rejected(new Error(), '', 1234)
      );
      expect(state.fetchStatus).toBe('failed');
      expect(state.orderByNumber).toBeNull();
    });
  });
});
