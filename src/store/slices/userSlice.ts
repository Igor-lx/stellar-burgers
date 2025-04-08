import {
  getUserApi,
  TRegisterData,
  registerUserApi,
  TLoginData,
  TUserResponse,
  loginUserApi,
  updateUserApi,
  logoutApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type UserState = {
  ready: boolean;
  loading: boolean;
  userData: TUser | null;
};

const initialState: UserState = {
  ready: false,
  loading: false,
  userData: null
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async () => await getUserApi()
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async (form: TRegisterData) => await registerUserApi(form)
);

export const signIn = createAsyncThunk(
  'user/signIn',
  async (form: TLoginData) => await loginUserApi(form)
);

export const editUser = createAsyncThunk(
  'user/editUser',
  async (form: TRegisterData) => await updateUserApi(form)
);

export const signOut = createAsyncThunk(
  'user/signOut',
  async () => await logoutApi()
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUserData: (s: UserState) => s.userData,
    selectReady: (s: UserState) => s.ready,
    selectUserName: (s: UserState) => s.userData?.name || ''
  },
  extraReducers: (builder) => {
    const onPending = (state: UserState) => {
      state.loading = true;
      state.ready = false;
    };

    const onRejected = (state: UserState) => {
      state.loading = false;
      state.ready = true;
    };

    const onSuccess = (
      state: UserState,
      action: PayloadAction<TUserResponse>
    ) => {
      state.loading = false;
      state.ready = true;
      state.userData = action.payload.user;
    };

    const onSignOutSuccess = (state: UserState) => {
      state.userData = null;
      state.loading = false;
      state.ready = true;
    };

    builder
      .addCase(signUp.pending, onPending)
      .addCase(signUp.rejected, onRejected)
      .addCase(signUp.fulfilled, onSuccess)

      .addCase(signIn.pending, onPending)
      .addCase(signIn.rejected, onRejected)
      .addCase(signIn.fulfilled, onSuccess)

      .addCase(fetchUser.pending, onPending)
      .addCase(fetchUser.rejected, onRejected)
      .addCase(fetchUser.fulfilled, onSuccess)

      .addCase(editUser.pending, onPending)
      .addCase(editUser.rejected, onRejected)
      .addCase(editUser.fulfilled, onSuccess)

      .addCase(signOut.pending, onPending)
      .addCase(signOut.rejected, onRejected)
      .addCase(signOut.fulfilled, onSignOutSuccess);
  }
});

export const { selectUserData, selectReady, selectUserName } =
  userSlice.selectors;
export default userSlice.reducer;
