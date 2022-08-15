import { apiService } from 'common/services';
import { USER_API } from '../constants';

class UserService {
  /**
   * fetchUser
   * @param requestBody
   */
  fetchUser(requestBody) {
    return apiService.get(USER_API, requestBody);
  }
  /**
   * addUser
   * @param requestBody
   */
  addUser(configs, requestBody) {
    return apiService.post(USER_API, requestBody, configs);
  }
  /**
   * updateUser
   * @param requestBody
   */
  updateUser(userId, requestBody, configs) {
    return apiService.put(`${USER_API}/${userId}`, requestBody, configs);
  }
  /**
   * deleteUser
   * @param requestBody
   */
  deleteUser(userId, requestBody) {
    return apiService.delete(`${USER_API}/${userId}`, requestBody);
  }
  /**
   * getUserById
   * @param requestBody
   */
  getUserById(userId, requestBody) {
    return apiService.get(`${USER_API}/${userId}`, requestBody);
  }
}

export const userService = new UserService();
