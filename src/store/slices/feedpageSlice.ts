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
  async (number, { rejectWithValue }) => {
    try {
      const result = await getOrderByNumberApi(number);
      if (!result.orders || !result.orders.length) {
        return rejectWithValue('Заказ не найден');
      }
      return result.orders[0];
    } catch (error) {
      return rejectWithValue('Ошибка при загрузке заказа');
    }
  }
);

interface IFeedState {
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  feedData: TOrdersData;
  orderByNumber: TOrder | null;
  error: string | null;
}

const initialState: IFeedState = {
  fetchStatus: 'idle',
  feedData: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  orderByNumber: null,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeedData: (state: IFeedState) => state.feedData,
    selectOrdersFromFeed: (state: IFeedState) => state.feedData.orders,
    selectFeedStatus: (state: IFeedState) => state.fetchStatus,
    selectFeedOrderByNumber: (state: IFeedState) => state.orderByNumber,
    selectFeedError: (state: IFeedState) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message ?? 'Ошибка загрузки ленты';
        state.feedData = { orders: [], total: 0, totalToday: 0 };
      })
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.fetchStatus = 'succeeded';
          state.feedData = action.payload;
          state.error = null;
        }
      )

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
        state.orderByNumber = null;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = (action.payload as string) || 'Ошибка загрузки заказа';
        state.orderByNumber = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.fetchStatus = 'succeeded';
          state.orderByNumber = action.payload;
          state.error = null;
        }
      );
  }
});

export const {
  selectFeedData,
  selectOrdersFromFeed,
  selectFeedStatus,
  selectFeedOrderByNumber,
  selectFeedError
} = feedSlice.selectors;

export default feedSlice;
