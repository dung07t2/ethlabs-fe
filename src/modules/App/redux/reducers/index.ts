import { PayloadAction } from '@reduxjs/toolkit';
import { set } from 'lodash';
import { IAppState } from '../../types';

export const defaultState: IAppState = {
  isLoaded: false,
  isToggleSidebar: true,
  loading: 'idle',
  currentRequestId: undefined,
  error: null
};

const reducers = {
  clearState: (state: IAppState) => {
    set(state, 'isLoaded', false);
    set(state, 'isToggleSidebar', false);
  },
  handleShowLoading: (state: IAppState, action: PayloadAction<boolean>) => {
    const { payload } = action;
    set(state, 'isLoaded', payload);
  },
  toggleSidebar: (state: IAppState) => {
    set(state, 'isToggleSidebar', !state.isToggleSidebar);
  },
  openSidebar: (state: IAppState) => {
    set(state, 'isToggleSidebar', true);
  },
  closeSidebar: (state: IAppState) => {
    set(state, 'isToggleSidebar', false);
  }
};

export default reducers;
