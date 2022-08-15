import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { set, get } from 'lodash';
import { USER_ACTION } from '../../constants';

export const fetchUsers = createAsyncThunk<any, any, ThunkAPIConfig>(
  USER_ACTION.FETCH,
  async (args, thunkAPI) => {
    const { userService } = get(thunkAPI, 'extra') as APIMapping;

    const response = await userService.fetchUser({
      headers: { Token: `${args}` }
    });
    return response.data;
  }
);

export const fetchUsersBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(fetchUsers.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(fetchUsers.fulfilled, (state: any, action: any) => {
    const { payload } = action;
    set(state, 'loading', 'idle');
    set(state, 'entities', payload.data);
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(fetchUsers.rejected, (state: any, action) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error);
    set(state, 'currentRequestId', undefined);
  });
};
