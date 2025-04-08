import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface UserState {
  ifUserAuthenticated: boolean;
  userInfo: TUser | null;
}

const initialState: UserState = {
  ifUserAuthenticated: false,
  userInfo: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectIfUserAuthenticated: (state: UserState) => state.ifUserAuthenticated,
    selectUserInfo: (state: UserState) => state.userInfo
  }
});

export const { selectIfUserAuthenticated, selectUserInfo } =
  userSlice.selectors;

export default userSlice.reducer;
