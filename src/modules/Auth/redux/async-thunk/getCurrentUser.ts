import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, set } from 'lodash';
import { AUTH_ACTION } from 'modules/Auth/constants';

export const getCurrentUser = createAsyncThunk<any, any, ThunkAPIConfig>(
  AUTH_ACTION.ME,
  async (args, thunkAPI) => {
    if (!args) return;
    const { authService } = get(thunkAPI, 'extra') as APIMapping;

    const response = await authService.getCurrentUser({
      headers: { Token: `${args}` }
    });
    return response.data;
  }
);

export const getCurrentUserBuilder = (
  builder: ActionReducerMapBuilder<any>
) => {
  builder.addCase(getCurrentUser.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(getCurrentUser.fulfilled, (state: any, action: any) => {
    const { payload } = action;
    set(state, 'loading', 'idle');
    set(state, 'currentUser', payload.data);
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(getCurrentUser.rejected, (state: any, action) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error.message);
    set(state, 'currentRequestId', undefined);
  });
};
