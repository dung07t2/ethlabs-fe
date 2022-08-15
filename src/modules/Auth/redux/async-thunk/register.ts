import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';
import { AUTH_ACTION } from '../../constants';
import { IRegisterForm } from '../../types';

export const register = createAsyncThunk<any, IRegisterForm, ThunkAPIConfig>(
  AUTH_ACTION.REGISTER,
  async (args, thunkAPI) => {
    const { authService } = get(thunkAPI, 'extra') as APIMapping;
    const response = await authService.register(args);

    return response.data;
  }
);

export const registerBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(register.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(register.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(register.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
