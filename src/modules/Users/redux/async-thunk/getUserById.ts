import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, isEmpty, set } from 'lodash';
import { USER_ACTION } from 'modules/Users/constants';

export const getUserById = createAsyncThunk<any, any, ThunkAPIConfig>(
  USER_ACTION.GET_USER_BY_ID,
  async (args, thunkAPI) => {
    if (isEmpty(args)) return;
    const { userService } = get(thunkAPI, 'extra') as APIMapping;

    const response = await userService.getUserById(args.data, {
      headers: { Token: `${args.token}` }
    });
    return response.data;
  }
);

export const getUserByIdBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(getUserById.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'currentRequestId', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(getUserById.fulfilled, (state: any, action: any) => {
    const { payload } = action;
    set(state, 'loading', 'idle');
    set(state, 'user', payload.data);
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(getUserById.rejected, (state: any, action) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error);
    set(state, 'currentRequestId', undefined);
  });
};
