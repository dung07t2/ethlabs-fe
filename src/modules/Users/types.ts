import { ReactNode } from 'react';

export interface IUserProps {
  children?: ReactNode;
}
export interface IUserState {
  entities: IUser[];
  user: IUser;
  userForm: {
    isShow: boolean;
    isAdd: boolean;
  };
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: any;
}
export interface IUser {
  id?: string | number;
  first_name?: string;
  last_name?: string;
  password?: string;
  email?: string;
  avatar?: string;
  role?: Role;
}

export enum Role {
  ADMIN = 'admin', // 0
  USER = 'user' // 1
}
