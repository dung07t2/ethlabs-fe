// import { PayloadAction } from '@reduxjs/toolkit';
import { set } from 'lodash';
import { IUserState } from '../../types';

export const defaultState: IUserState = {
  entities: [],
  user: {},
  userForm: {
    isShow: false,
    isAdd: true
  },
  loading: 'idle',
  currentRequestId: undefined,
  error: null
};

const reducers = {
  clearState: (state: IUserState) => {
    set(state, 'entities', []);
    set(state, 'user', {});
    set(state, 'userForm', {
      isShow: false,
      isAdd: true
    });
  },
  updateQuizActions: (state: IUserState, action) => {
    const { payload } = action;
    set(state, 'userForm', { ...state.userForm, ...payload });
  }
};

export default reducers;
