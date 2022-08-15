import { RootState } from 'common';
import { Dispatch } from 'redux';

declare global {
  type ThunkAPIConfig = {
    dispath: Dispatch;
    rejectValue: {
      errorMessage: string;
    };
    state: RootState;
    extra: any;
  };
}

export {};
