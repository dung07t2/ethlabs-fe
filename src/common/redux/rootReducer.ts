import { combineReducers } from '@reduxjs/toolkit';
import { AppDispatch } from 'common/redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Reducers
import { reducer as app } from 'modules/App';
import { reducer as auth } from 'modules/Auth';
import { reducer as user } from 'modules/Users';

export const reducerMappingList = {
  app,
  auth,
  user
};

const rootReducer = combineReducers(reducerMappingList);
export type RootState = ReturnType<typeof rootReducer>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default rootReducer;
