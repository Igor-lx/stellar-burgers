import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';

export const fetchFeed = createAsyncThunk<TOrdersData>(
  'feed/fetchFeed',
  async () => {
    try {
      return await getFeedsApi();
    } catch (error) {
      throw new Error('Не удалось загрузить ленту заказов');
    }
  }
);

interface FeedState {
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  feedData: TOrdersData;
}

const initialState: FeedState = {
  fetchStatus: 'idle',
  feedData: {
    orders: [],
    total: 0,
    totalToday: 0
  }
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeedData: (state: FeedState) => state.feedData,
    selectOrdersFromFeed: (state: FeedState) => state.feedData.orders,
    selectFeedLoading: (state: FeedState) => state.fetchStatus === 'loading',
    selectFeedStatus: (state: FeedState) => state.fetchStatus
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
      );
  }
});

export const {
  selectFeedData,
  selectOrdersFromFeed,
  selectFeedLoading,
  selectFeedStatus
} = feedSlice.selectors;
