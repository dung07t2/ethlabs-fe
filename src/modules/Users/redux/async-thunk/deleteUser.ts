import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, isEmpty, set } from 'lodash';
import { USER_ACTION } from 'modules/Users/constants';

export const deleteUser = createAsyncThunk<any, any, ThunkAPIConfig>(
  USER_ACTION.DELETE,
  async (args, thunkAPI) => {
    if (isEmpty(args)) return;
    const { userService } = get(thunkAPI, 'extra') as APIMapping;

    const response = await userService.deleteUser(args.data, {
      headers: { Token: `${args.token}` }
    });
    return response.data;
  }
);

export const deleteUserBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(deleteUser.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'currentRequestId', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(deleteUser.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(deleteUser.rejected, (state: any, action) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error);
    set(state, 'currentRequestId', undefined);
  });
};
