import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, isEmpty, set } from 'lodash';
import { USER_ACTION } from 'modules/Users/constants';

export const updateUser = createAsyncThunk<any, any, ThunkAPIConfig>(
  USER_ACTION.UPDATE,
  async (args, thunkAPI) => {
    if (isEmpty(args)) return;

    const { userService } = get(thunkAPI, 'extra') as APIMapping;
    const { userId, token, data } = args;

    const response = await userService.updateUser(userId, data, {
      headers: { Token: `${token}` }
    });
    return response.data;
  }
);

export const updateUserBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(updateUser.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'currentRequestId', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(updateUser.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(updateUser.rejected, (state: any, action) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error);
    set(state, 'currentRequestId', undefined);
  });
};
