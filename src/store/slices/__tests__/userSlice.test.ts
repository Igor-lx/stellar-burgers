import { generateTestUser } from '../../../utils/test-utils';
import {
  UserState,
  userSlice,
  signUp,
  signIn,
  signOut,
  getUserData,
  editUserData
} from '../userSlice';

describe('userSlice', () => {
  let initialState: UserState;

  beforeEach(() => {
    initialState = {
      ifAuth: false,
      loading: false,
      userChecked: false,
      userData: null
    };
  });

  describe('signUp', () => {
    it('должен устанавливать loading true при pending', () => {
      const state = userSlice.reducer(initialState, {
        type: signUp.pending.type
      });
      expect(state.loading).toBe(true);
    });

    it('должен сбрасывать loading при rejected', () => {
      const state = userSlice.reducer(
        { ...initialState, loading: true },
        { type: signUp.rejected.type }
      );
      expect(state.loading).toBe(false);
    });

    it('должен сохранять userData, ifAuth, userChecked и сбрасывать loading при fulfilled', () => {
      const user = generateTestUser();
      const state = userSlice.reducer(initialState, {
        type: signUp.fulfilled.type,
        payload: { user }
      });
      expect(state).toEqual({
        ...initialState,
        loading: false,
        ifAuth: true,
        userChecked: true,
        userData: user
      });
    });
  });

  describe('signIn', () => {
    it('должен устанавливать loading true при pending', () => {
      const state = userSlice.reducer(initialState, {
        type: signIn.pending.type
      });
      expect(state.loading).toBe(true);
    });

    it('должен сбрасывать loading при rejected', () => {
      const state = userSlice.reducer(
        { ...initialState, loading: true },
        { type: signIn.rejected.type }
      );
      expect(state.loading).toBe(false);
    });

    it('должен сохранять userData, ifAuth, userChecked при fulfilled', () => {
      const user = generateTestUser('Login User', 'login@mail.com');
      const state = userSlice.reducer(initialState, {
        type: signIn.fulfilled.type,
        payload: { user }
      });
      expect(state).toEqual({
        ...initialState,
        loading: false,
        ifAuth: true,
        userChecked: true,
        userData: user
      });
    });
  });

  describe('signOut', () => {
    it('должен устанавливать loading true при pending', () => {
      const state = userSlice.reducer(initialState, {
        type: signOut.pending.type
      });
      expect(state.loading).toBe(true);
    });

    it('должен сбрасывать loading при rejected', () => {
      const state = userSlice.reducer(
        { ...initialState, loading: true },
        { type: signOut.rejected.type }
      );
      expect(state.loading).toBe(false);
    });

    it('должен очищать userData и устанавливать userChecked true при fulfilled', () => {
      const preloaded: UserState = {
        ifAuth: true,
        loading: false,
        userChecked: true,
        userData: generateTestUser()
      };
      const state = userSlice.reducer(preloaded, {
        type: signOut.fulfilled.type
      });
      expect(state).toEqual({ ...initialState, userChecked: true });
    });
  });

  describe('getUserData', () => {
    it('должен устанавливать loading true при pending', () => {
      const state = userSlice.reducer(initialState, {
        type: getUserData.pending.type
      });
      expect(state.loading).toBe(true);
    });

    it('должен сбрасывать loading и устанавливать userChecked true при rejected', () => {
      const state = userSlice.reducer(
        { ...initialState, loading: true },
        { type: getUserData.rejected.type }
      );
      expect(state).toEqual({
        ...initialState,
        loading: false,
        userChecked: true
      });
    });

    it('должен сохранять userData, ifAuth, userChecked при fulfilled', () => {
      const user = generateTestUser('Fetched User', 'fetched@mail.com');
      const state = userSlice.reducer(initialState, {
        type: getUserData.fulfilled.type,
        payload: { user }
      });
      expect(state).toEqual({
        ...initialState,
        loading: false,
        ifAuth: true,
        userChecked: true,
        userData: user
      });
    });
  });

  describe('editUserData', () => {
    it('должен устанавливать loading true при pending', () => {
      const state = userSlice.reducer(initialState, {
        type: editUserData.pending.type
      });
      expect(state.loading).toBe(true);
    });

    it('должен сбрасывать loading при rejected', () => {
      const state = userSlice.reducer(
        { ...initialState, loading: true },
        { type: editUserData.rejected.type }
      );
      expect(state.loading).toBe(false);
    });

    it('должен сохранять userData, ifAuth, userChecked при fulfilled', () => {
      const user = generateTestUser('Updated User', 'updated@mail.com');
      const state = userSlice.reducer(initialState, {
        type: editUserData.fulfilled.type,
        payload: { user }
      });
      expect(state).toEqual({
        ...initialState,
        loading: false,
        ifAuth: true,
        userChecked: true,
        userData: user
      });
    });
  });
});
