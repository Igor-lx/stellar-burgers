import { generateTestUser } from '../../../utils/test-utils';
import { TUser } from '../../../utils/types';
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

  it('signUp.pending — loading true', () => {
    const state = userSlice.reducer(initialState, {
      type: signUp.pending.type
    });
    expect(state.loading).toBe(true);
  });

  it('signUp.rejected — loading false', () => {
    const state = userSlice.reducer(
      { ...initialState, loading: true },
      { type: signUp.rejected.type }
    );
    expect(state.loading).toBe(false);
  });

  it('signUp.fulfilled — userData, ifAuth, userChecked, loading false', () => {
    const user = generateTestUser();
    const state = userSlice.reducer(initialState, {
      type: signUp.fulfilled.type,
      payload: { user }
    });
    expect(state).toEqual({
      loading: false,
      ifAuth: true,
      userChecked: true,
      userData: user
    });
  });

  it('signIn.pending — loading true', () => {
    const state = userSlice.reducer(initialState, {
      type: signIn.pending.type
    });
    expect(state.loading).toBe(true);
  });

  it('signIn.rejected — loading false', () => {
    const state = userSlice.reducer(
      { ...initialState, loading: true },
      { type: signIn.rejected.type }
    );
    expect(state.loading).toBe(false);
  });

  it('signIn.fulfilled — userData, ifAuth, userChecked', () => {
    const user = generateTestUser('Login User', 'login@mail.com');
    const state = userSlice.reducer(initialState, {
      type: signIn.fulfilled.type,
      payload: { user }
    });
    expect(state).toEqual({
      loading: false,
      ifAuth: true,
      userChecked: true,
      userData: user
    });
  });

  it('signOut.pending — loading true', () => {
    const state = userSlice.reducer(initialState, {
      type: signOut.pending.type
    });
    expect(state.loading).toBe(true);
  });

  it('signOut.rejected — loading false', () => {
    const state = userSlice.reducer(
      { ...initialState, loading: true },
      { type: signOut.rejected.type }
    );
    expect(state.loading).toBe(false);
  });

  it('signOut.fulfilled — сбрасывает auth и userData, сохраняет userChecked', () => {
    const loggedIn: UserState = {
      ifAuth: true,
      loading: false,
      userChecked: true,
      userData: generateTestUser()
    };
    const state = userSlice.reducer(loggedIn, { type: signOut.fulfilled.type });
    expect(state).toEqual({
      ...initialState,
      userChecked: true
    });
  });

  it('getUserData.pending — loading true', () => {
    const state = userSlice.reducer(initialState, {
      type: getUserData.pending.type
    });
    expect(state.loading).toBe(true);
  });

  it('getUserData.rejected — loading false, userChecked true', () => {
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

  it('getUserData.fulfilled — userData, ifAuth, userChecked', () => {
    const user = generateTestUser('Fetched', 'fetched@mail.com');
    const state = userSlice.reducer(initialState, {
      type: getUserData.fulfilled.type,
      payload: { user }
    });
    expect(state).toEqual({
      loading: false,
      ifAuth: true,
      userChecked: true,
      userData: user
    });
  });

  it('editUserData.pending — loading true', () => {
    const state = userSlice.reducer(initialState, {
      type: editUserData.pending.type
    });
    expect(state.loading).toBe(true);
  });

  it('editUserData.rejected — loading false', () => {
    const state = userSlice.reducer(
      { ...initialState, loading: true },
      { type: editUserData.rejected.type }
    );
    expect(state.loading).toBe(false);
  });

  it('editUserData.fulfilled — userData обновляется, ifAuth true, userChecked true, loading false', () => {
    const user = generateTestUser('Updated', 'updated@mail.com');
    const state = userSlice.reducer(initialState, {
      type: editUserData.fulfilled.type,
      payload: { user }
    });
    expect(state).toEqual({
      loading: false,
      ifAuth: true,
      userChecked: true,
      userData: user
    });
  });
});
