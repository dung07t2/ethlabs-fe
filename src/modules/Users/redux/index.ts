import { createSlice } from '@reduxjs/toolkit';
import {
  addUser,
  addUserBuilder,
  deleteUser,
  deleteUserBuilder,
  fetchUsers,
  fetchUsersBuilder,
  getUserById,
  getUserByIdBuilder,
  updateUser,
  updateUserBuilder
} from './async-thunk';
import reducers, { defaultState } from './reducers';

const { actions, reducer } = createSlice({
  name: 'user',
  initialState: { ...defaultState },
  reducers,
  extraReducers: builder => {
    fetchUsersBuilder(builder);
    addUserBuilder(builder);
    updateUserBuilder(builder);
    deleteUserBuilder(builder);
    getUserByIdBuilder(builder);
  }
});

const extraActions = {
  ...actions,
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
  getUserById
};

export * from './select-hooks';
export { extraActions as actionsUser, reducer };
