import { createSlice } from '@reduxjs/toolkit';
import { upload, uploadBuilder } from './async-thunk/upload';
import reducers, { defaultState } from './reducers';

const { actions, reducer } = createSlice({
  name: 'app',
  initialState: { ...defaultState },
  reducers,
  extraReducers: builder => {
    uploadBuilder(builder);
  }
});

const extraActions = {
  ...actions,
  upload
};

export * from './select-hooks';
export { extraActions as actionsApp, reducer };
