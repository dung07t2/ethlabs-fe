import { IUser } from 'modules/Users';

export interface IAuthProps {
  children: React.ReactNode;
}

export interface IAuthState {
  currentUser: IUser;
  loading: 'idle' | 'pending';
  currentRequestId: string | undefined;
  error: any;
}

export interface ILoginForm {
  email: string;
  password: string;
  remember: boolean;
}

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IForgotPasswordForm {
  email: string;
}
