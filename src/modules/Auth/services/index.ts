import { apiService } from 'common/services';
import { AUTH_API } from '../constants';

class AuthService {
  /**
   * login
   * @param requestBody
   */
  login(requestBody) {
    // return apiService.post(AUTH_API.LOGIN, requestBody);
    return {
      data: {
        token: 'avc'
      }
    };
  }

  /**
   * getCurrentUser
   * @param requestBody
   * @returns
   */
  getCurrentUser(requestBody) {
    return apiService.get(AUTH_API.ME, requestBody);
  }

  /**
   * register
   * @param data
   * @returns
   */
  register(requestBody) {
    return apiService.post(AUTH_API.REGISTER, requestBody);
  }
  /**
   * forgotPassword
   * @param data
   * @returns
   */
  forgotPassword(requestBody) {
    return apiService.post(AUTH_API.FORGOT_PASSWORD, requestBody);
  }
}

export const authService = new AuthService();
