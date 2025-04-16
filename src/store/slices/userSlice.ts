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

export type UserState = {
  ifAuth: boolean;
  loading: boolean;
  userChecked: boolean;
  userData: TUser | null;
};

const initialState: UserState = {
  ifAuth: false,
  loading: false,
  userChecked: false,
  userData: null
};

export const signUp = createAsyncThunk<TUserResponse, TRegisterData>(
  'user/signUp',
  async (form, { dispatch }) => {
    const response = await registerUserApi(form);
    if (!response?.success) throw new Error('Registration failed');

    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);

    const userResponse = await dispatch(getUserData()).unwrap();
    return userResponse;
  }
);
export const signIn = createAsyncThunk<TUserResponse, TLoginData>(
  'user/signIn',
  async (form, { dispatch }) => {
    const result = await loginUserApi(form);
    if (!result?.success) throw new Error('Login failed');

    setCookie('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);

    const userResponse = await dispatch(getUserData()).unwrap();
    return userResponse;
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
    selectIfLoading: (state: UserState) => state.loading,
    selectUserChecked: (state: UserState) => state.userChecked,
    selectUserName: (state: UserState) => state.userData?.name || ''
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        signUp.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.loading = false;
          state.userData = action.payload.user;
          state.ifAuth = true;
          state.userChecked = true;
        }
      )

      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        signIn.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.loading = false;
          state.userData = action.payload.user;
          state.ifAuth = true;
          state.userChecked = true;
        }
      )

      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
        state.userChecked = true;
        state.ifAuth = false;
      })
      .addCase(
        getUserData.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.loading = false;
          state.userData = action.payload.user;
          state.ifAuth = true;
          state.userChecked = true;
        }
      )

      .addCase(editUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUserData.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        editUserData.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.loading = false;
          state.userData = action.payload.user;
          state.ifAuth = true;
          state.userChecked = true;
        }
      )

      .addCase(signOut.pending, (state) => {
        state.loading = true;
      })
      .addCase(signOut.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.userData = null;
        state.ifAuth = false;
        state.userChecked = true;
        state.loading = false;
      });
  }
});

export const {
  selectUserData,
  selectIfAuth,
  selectIfLoading,
  selectUserChecked,
  selectUserName
} = userSlice.selectors;
