import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { APIMapping } from 'common/api';
import { get, isEmpty, set } from 'lodash';
import { APP_ACTION } from '../../constants';

export const upload = createAsyncThunk<any, any, ThunkAPIConfig>(
  APP_ACTION.UPLOAD,
  async (args, thunkAPI) => {
    if (isEmpty(args)) return;

    const { appService } = get(thunkAPI, 'extra') as APIMapping;
    const { token, data } = args;
    const formData = new FormData();

    formData.append('thumbnail', data);

    const response = await appService.upload(
      { headers: { Token: `${token}` } },
      formData
    );
    return response.data;
  }
);

export const uploadBuilder = (builder: ActionReducerMapBuilder<any>) => {
  builder.addCase(upload.pending, (state: any, action: any) => {
    const { requestId } = action.meta;
    set(state, 'loading', 'pending');
    set(state, 'error', null);
    set(state, 'currentRequestId', requestId);
  });
  builder.addCase(upload.fulfilled, (state: any, action: any) => {
    set(state, 'loading', 'idle');
    set(state, 'currentRequestId', undefined);
  });
  builder.addCase(upload.rejected, (state: any, action) => {
    const { error } = action;
    set(state, 'loading', 'idle');
    set(state, 'error', error);
    set(state, 'currentRequestId', undefined);
  });
};
