import { getOrdersApi } from '@api';
import { createAsyncThunk, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const getOrdersHistoryThunk = createAsyncThunk(
  'ordersHistory/getOrdersHistory',
  async () => getOrdersApi()
);

interface OrdersHistoryState {
  isLoading: boolean;
  ordersHistory: TOrder[];
}

export const initialState: OrdersHistoryState = {
  isLoading: false,
  ordersHistory: []
};

const onPending = (state: OrdersHistoryState) => {
  state.isLoading = true;
};

const onRejected = (state: OrdersHistoryState) => {
  state.isLoading = false;
};

const onSuccess = (
  state: OrdersHistoryState,
  action: PayloadAction<TOrder[]>
) => {
  state.isLoading = false;
  state.ordersHistory = action.payload;
};

export const ordersHistorySlice = createSlice({
  name: 'ordersHistory',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersHistory: (state: OrdersHistoryState) => state.ordersHistory,
    selectLoadingStatus: (state: OrdersHistoryState) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersHistoryThunk.pending, onPending)
      .addCase(getOrdersHistoryThunk.rejected, onRejected)
      .addCase(getOrdersHistoryThunk.fulfilled, onSuccess);
  }
});

export const { selectOrdersHistory } = ordersHistorySlice.selectors;
