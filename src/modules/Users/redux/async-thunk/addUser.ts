import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, isEmpty, set } from 'lodash';
import { USER_ACTION } from 'modules/Users/constants';

export const addUser = createAsyncThunk<any, any, ThunkAPIConfig>(
  USER_ACTION.ADD,
  async (args, thunkAPI) => {
    if (isEmpty(args)) return;

    const { userService } = get(thunkAPI, 'extra') as APIMapping;
    const { token, data } = args;

    const response = await userService.addUser(
      { headers: { Token: `${token}` } },
      { ...data, role: 'user' }
    );
    return response.data;
  }
);

export const addUserBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(addUser.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'currentRequestId', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(addUser.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(addUser.rejected, (state: any, action) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error);
    set(state, 'currentRequestId', undefined);
  });
};
