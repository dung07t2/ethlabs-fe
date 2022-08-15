import { RootState } from 'common/redux';
import { IUserState } from '../../types';
import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
/**
 * usersSelector
 */
const usersSelector = createSelector(
  (state: RootState) => state.user,
  (data: IUserState) => {
    const { entities, error, loading } = data;
    return {
      entities,
      error,
      loading
    };
  }
);

export const useSelectUsersStore = () => {
  return useSelector<RootState, any>(usersSelector);
};

/**
 * userSelector
 */
const userSelector = createSelector(
  (state: RootState) => state.user,
  (data: IUserState) => {
    const { user, error, loading } = data;
    return {
      user,
      error,
      loading
    };
  }
);
export const useSelectUserStore = () => {
  return useSelector<RootState, any>(userSelector);
};

/**
 * userFormStateSelector
 */
const userFormStateSelector = createSelector(
  (state: RootState) => state.user,
  (data: IUserState) => data.userForm
);
export const useSelectUserFormState = () => {
  return useSelector<RootState, any>(userFormStateSelector);
};
