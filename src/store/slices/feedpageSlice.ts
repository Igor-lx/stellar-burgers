import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { TOrdersData, TOrder } from '../../utils/types';

export const fetchFeed = createAsyncThunk<TOrdersData>(
  'feed/fetchFeed',
  async () => {
    const data = await getFeedsApi();
    if (data?.success) return data;
    throw new Error('Не удалось загрузить ленту заказов');
  }
);

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'feed/fetchOrderByNumber',
  async (number) => {
    try {
      const result = await getOrderByNumberApi(number);
      if (!result.orders || !result.orders.length) {
        throw new Error('Заказ не найден');
      }
      return result.orders[0];
    } catch (error) {
      throw new Error('Ошибка при загрузке заказа');
    }
  }
);

interface IFeedState {
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  feedData: TOrdersData;
  orderByNumber: TOrder | null;
}

const initialState: IFeedState = {
  fetchStatus: 'idle',
  feedData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  orderByNumber: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeedData: (state: IFeedState) => state.feedData,
    selectOrdersFromFeed: (state: IFeedState) => state.feedData.orders,
    selectFeedStatus: (state: IFeedState) => state.fetchStatus,
    selectFeedOrderByNumber: (state: IFeedState) => state.orderByNumber
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.fetchStatus = 'failed';
        state.feedData = { orders: [], total: 0, totalToday: 0 };
      })
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.fetchStatus = 'succeeded';
          state.feedData = action.payload;
        }
      )
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.fetchStatus = 'loading';
        state.orderByNumber = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.fetchStatus = 'failed';
        state.orderByNumber = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.fetchStatus = 'succeeded';
          state.orderByNumber = action.payload;
        }
      );
  }
});

export const {
  selectFeedData,
  selectOrdersFromFeed,
  selectFeedStatus,
  selectFeedOrderByNumber
} = feedSlice.selectors;

export default feedSlice;
