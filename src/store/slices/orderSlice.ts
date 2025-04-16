import { TOrder } from '@utils-types';
import {
  orderBurgerApi,
  getOrderByNumberApi,
  TNewOrderResponse,
  TOrderResponse
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { clearConstructor } from './burgerConstructorSlice';

export const fetchOrder = createAsyncThunk(
  'order/fetch',
  async (ids: string[], { dispatch }) => {
    const response = await orderBurgerApi(ids);
    dispatch(clearConstructor());
    return response;
  }
);
export const getOrderByNum = createAsyncThunk(
  'order/fetchByNum',
  async (orderId: number) => await getOrderByNumberApi(orderId)
);

type OrderState = {
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  order: TOrder | null;
};

const initialState: OrderState = {
  fetchStatus: 'idle',
  order: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.fetchStatus = 'idle';
    }
  },
  selectors: {
    selectOrder: (state: OrderState) => state.order,
    selectOrderStatus: (state: OrderState) => state.fetchStatus,
    selectOrderLoading: (state: OrderState) => state.fetchStatus === 'loading'
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.fetchStatus = 'failed';
      })
      .addCase(
        fetchOrder.fulfilled,
        (state, action: PayloadAction<TNewOrderResponse>) => {
          state.fetchStatus = 'succeeded';
          state.order = action.payload.order;
        }
      )
      .addCase(getOrderByNum.pending, (state) => {
        state.fetchStatus = 'loading';
      })
      .addCase(getOrderByNum.rejected, (state) => {
        state.fetchStatus = 'failed';
      })
      .addCase(
        getOrderByNum.fulfilled,
        (state, action: PayloadAction<TOrderResponse>) => {
          state.fetchStatus = 'succeeded';
          state.order = action.payload.orders[0];
        }
      );
  }
});

export const { clearOrder } = orderSlice.actions;
export const { selectOrder, selectOrderStatus, selectOrderLoading } =
  orderSlice.selectors;
