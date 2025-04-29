import { generateOrder, generateFeed } from '../../../utils/test-utils';
import { TOrder, TOrdersData } from '../../../utils/types';
import feedSlice, { fetchFeed, fetchOrderByNumber } from '../feedpageSlice';

describe('feedSlice', () => {
  const initialState = feedSlice.getInitialState();

  const mockOrder = generateOrder(1234);
  const mockFeed = generateFeed([mockOrder]);

  it('возврат начального состояния', () => {
    expect(initialState.fetchStatus).toBe('idle');
    expect(initialState.feedData.orders).toEqual([]);
  });

  describe('fetchFeed', () => {
    it('статус loading при fetchFeed.pending', () => {
      const state = feedSlice.reducer(initialState, fetchFeed.pending(''));
      expect(state.fetchStatus).toBe('loading');
    });

    it('обновляет feedData + статус succeeded при fetchFeed.fulfilled', () => {
      const state = feedSlice.reducer(
        initialState,
        fetchFeed.fulfilled(mockFeed, '')
      );
      expect(state.fetchStatus).toBe('succeeded');
      expect(state.feedData).toEqual(mockFeed);
    });

    it('очищает feedData + статус failed при fetchFeed.rejected', () => {
      const preloaded = { ...initialState, feedData: mockFeed };
      const state = feedSlice.reducer(
        preloaded,
        fetchFeed.rejected(new Error('Ошибка'), '')
      );
      expect(state.fetchStatus).toBe('failed');
      expect(state.feedData).toEqual({ orders: [], total: 0, totalToday: 0 });
    });
  });

  describe('fetchOrderByNumber', () => {
    it('сбрасывает orderByNumber + статус loading при fetchOrderByNumber.pending', () => {
      const preloaded = { ...initialState, orderByNumber: mockOrder };
      const state = feedSlice.reducer(
        preloaded,
        fetchOrderByNumber.pending('', 1234)
      );
      expect(state.fetchStatus).toBe('loading');
      expect(state.orderByNumber).toBeNull();
    });

    it('обновляет orderByNumber + статус succeeded при fetchOrderByNumber.fulfilled', () => {
      const state = feedSlice.reducer(
        initialState,
        fetchOrderByNumber.fulfilled(mockOrder, '', 1234)
      );
      expect(state.fetchStatus).toBe('succeeded');
      expect(state.orderByNumber).toEqual(mockOrder);
    });

    it('сбрасывает orderByNumber + статус failed при fetchOrderByNumber.rejected', () => {
      const preloaded = { ...initialState, orderByNumber: mockOrder };
      const state = feedSlice.reducer(
        preloaded,
        fetchOrderByNumber.rejected(new Error('Ошибка'), '', 1234)
      );
      expect(state.fetchStatus).toBe('failed');
      expect(state.orderByNumber).toBeNull();
    });
  });
});
