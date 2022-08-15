import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';
import { AUTH_ACTION } from '../../constants';
import { IForgotPasswordForm } from '../../types';

export const forgotPassword = createAsyncThunk<
  any,
  IForgotPasswordForm,
  ThunkAPIConfig
>(AUTH_ACTION.FORGOT_PASSWORD, async (args, thunkAPI) => {
  const { authService } = get(thunkAPI, 'extra') as APIMapping;
  const response = await authService.forgotPassword(args);

  return response.data;
});

export const forgotPasswordBuilder = (
  builder: ActionReducerMapBuilder<any>
) => {
  builder.addCase(forgotPassword.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(forgotPassword.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(forgotPassword.rejected, (state: any, action: any) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
