import { RootState } from 'common/redux';
import { useSelector } from 'react-redux';
import { IAuthState } from 'modules/Auth';
import { createSelector } from '@reduxjs/toolkit';

const authSelector = createSelector(
  (state: RootState) => state.auth,
  (data: IAuthState) => {
    const { currentUser, error, loading } = data;
    return {
      currentUser,
      error,
      loading
    };
  }
);

export const useSelectAuthStore = () => {
  return useSelector<RootState, any>(authSelector);
};

export const useSelectCurrentUserStore = () => {
  return useSelector<RootState, any>(state => state.auth.currentUser);
};
