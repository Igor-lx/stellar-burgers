import { TUser } from '../../../utils/types';
import {
  UserState,
  signUp,
  userSlice,
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

  it('signUp.pending — устанавливает loading в true', () => {
    const action = { type: signUp.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('signUp.rejected — сбрасывает loading', () => {
    const action = { type: signUp.rejected.type };
    const state = userSlice.reducer({ ...initialState, loading: true }, action);
    expect(state).toEqual({
      ...initialState,
      loading: false
    });
  });

  it('signUp.fulfilled — устанавливает userData, ifAuth, userChecked, сбрасывает loading', () => {
    const user: TUser = { name: 'Test', email: 'test@mail.com' };
    const action = { type: signUp.fulfilled.type, payload: { user } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      ifAuth: true,
      userChecked: true,
      userData: user
    });
  });

  it('signIn.pending — устанавливает loading в true', () => {
    const action = { type: signIn.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('signIn.rejected — сбрасывает loading', () => {
    const action = { type: signIn.rejected.type };
    const state = userSlice.reducer({ ...initialState, loading: true }, action);
    expect(state).toEqual({
      ...initialState,
      loading: false
    });
  });

  it('signIn.fulfilled — обновляет userData, ifAuth, userChecked', () => {
    const user: TUser = { name: 'Login User', email: 'login@mail.com' };
    const action = { type: signIn.fulfilled.type, payload: { user } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      ifAuth: true,
      userChecked: true,
      userData: user
    });
  });

  it('signOut.fulfilled — сбрасывает auth и userData', () => {
    const loggedInState: UserState = {
      ifAuth: true,
      loading: false,
      userChecked: true,
      userData: { name: 'Name', email: 'email@mail.com' }
    };
    const action = { type: signOut.fulfilled.type };
    const state = userSlice.reducer(loggedInState, action);
    expect(state).toEqual({
      ...initialState,
      userChecked: true
    });
  });

  it('getUserData.pending — loading true', () => {
    const action = { type: getUserData.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('getUserData.fulfilled — обновляет userData и авторизацию', () => {
    const user: TUser = { name: 'Get User', email: 'get@mail.com' };
    const action = { type: getUserData.fulfilled.type, payload: { user } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      ifAuth: true,
      userChecked: true,
      userData: user
    });
  });

  it('getUserData.rejected — loading false, userChecked true, ifAuth false', () => {
    const action = { type: getUserData.rejected.type };
    const state = userSlice.reducer({ ...initialState, loading: true }, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      userChecked: true
    });
  });

  it('editUserData.pending — loading true', () => {
    const action = { type: editUserData.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('editUserData.rejected — loading false', () => {
    const action = { type: editUserData.rejected.type };
    const state = userSlice.reducer({ ...initialState, loading: true }, action);
    expect(state).toEqual({
      ...initialState,
      loading: false
    });
  });

  it('editUserData.fulfilled — обновляет userData', () => {
    const user: TUser = { name: 'Updated', email: 'updated@mail.com' };
    const action = { type: editUserData.fulfilled.type, payload: { user } };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      loading: false,
      ifAuth: true,
      userChecked: true,
      userData: user
    });
  });
});
