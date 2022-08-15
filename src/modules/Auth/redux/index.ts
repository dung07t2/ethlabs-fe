import { createSlice } from '@reduxjs/toolkit';
import {
  forgotPassword,
  forgotPasswordBuilder,
  getCurrentUser,
  getCurrentUserBuilder,
  login,
  loginBuilder,
  register,
  registerBuilder
} from './async-thunk';
import reducers, { defaultState } from './reducers';

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState: { ...defaultState },
  reducers,
  extraReducers: builder => {
    loginBuilder(builder);
    forgotPasswordBuilder(builder);
    registerBuilder(builder);
    getCurrentUserBuilder(builder);
  }
});

const extraActions = {
  ...actions,
  login,
  forgotPassword,
  register,
  getCurrentUser
};

export * from './select-hooks';
export { extraActions as actionsAuth, reducer };
