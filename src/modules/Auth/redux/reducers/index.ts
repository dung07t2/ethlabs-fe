import { set } from 'lodash';
import { IAuthState } from '../../types';

export const defaultState: IAuthState = {
  currentUser: {},
  loading: 'idle',
  currentRequestId: undefined,
  error: null
};

const reducers = {
  clearState: (state: IAuthState) => {
    set(state, 'currentUser', {});
  }
};

export default reducers;
