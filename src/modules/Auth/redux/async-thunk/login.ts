import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';

import { AUTH_ACTION } from '../../constants';
import { ILoginForm } from '../../types';

export const login = createAsyncThunk<any, ILoginForm, ThunkAPIConfig>(
  AUTH_ACTION.LOGIN,
  async (args, thunkAPI) => {
    const { authService } = get(thunkAPI, 'extra') as APIMapping;
    const response = await authService.login(args);

    return response.data;
  }
);

export const loginBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(login.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(login.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(login.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
