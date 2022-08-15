import { appService } from 'modules/App';
import { authService } from 'modules/Auth';
import { userService } from 'modules/Users';

export const apiMapping = {
  authService,
  userService,
  appService
};
export { authService };

export type APIMapping = typeof apiMapping;
