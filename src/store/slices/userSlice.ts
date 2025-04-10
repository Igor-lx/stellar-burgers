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
import { deleteCookie, setCookie } from '../../utils/cookie';

type UserState = {
  ifAuth: boolean;
  loading: boolean;
  userData: TUser | null;
};

const initialState: UserState = {
  ifAuth: false,
  loading: false,
  userData: null
};

export const signUp = createAsyncThunk(
  'user/signUp',
  async (form: TRegisterData, { dispatch }) => {
    const response = await registerUserApi(form);
    if (!response?.success) throw new Error('Registration failed');

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    await dispatch(getUserData());
  }
);

export const signIn = createAsyncThunk(
  'user/signIn',
  async (form: TLoginData, { dispatch }) => {
    const result = await loginUserApi(form);
    if (!result?.success) throw new Error('Login failed');

    setCookie('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);

    await dispatch(getUserData());
  }
);

export const signOut = createAsyncThunk('user/signOut', async () => {
  const res = await logoutApi();
  if (!res?.success) throw new Error('Logout failed');

  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const getUserData = createAsyncThunk(
  'user/getUser',
  async () => await getUserApi()
);

export const editUserData = createAsyncThunk(
  'user/editUser',
  async (form: TRegisterData) => await updateUserApi(form)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUserData: (state: UserState) => state.userData,
    selectIfAuth: (state: UserState) => state.ifAuth,
    selectUserName: (state: UserState) => state.userData?.name || ''
  },
  extraReducers: (builder) => {
    const onPending = (state: UserState) => {
      state.loading = true;
    };

    const onRejected = (state: UserState) => {
      state.loading = false;
    };

    const onGetUserSuccess = (
      state: UserState,
      action: PayloadAction<TUserResponse>
    ) => {
      state.loading = false;
      state.ifAuth = true;
      state.userData = action.payload.user;
    };

    const onSignOutSuccess = (state: UserState) => {
      state.userData = null;
      state.loading = false;
      state.ifAuth = false;
    };

    builder
      .addCase(signUp.pending, onPending)
      .addCase(signUp.rejected, onRejected)
      .addCase(signUp.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(signIn.pending, onPending)
      .addCase(signIn.rejected, onRejected)
      .addCase(signIn.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(getUserData.pending, onPending)
      .addCase(getUserData.rejected, onRejected)
      .addCase(getUserData.fulfilled, onGetUserSuccess)

      .addCase(editUserData.pending, onPending)
      .addCase(editUserData.rejected, onRejected)
      .addCase(editUserData.fulfilled, onGetUserSuccess)

      .addCase(signOut.pending, onPending)
      .addCase(signOut.rejected, onRejected)
      .addCase(signOut.fulfilled, onSignOutSuccess);
  }
});

export const { selectUserData, selectIfAuth, selectUserName } =
  userSlice.selectors;
export default userSlice.reducer;
