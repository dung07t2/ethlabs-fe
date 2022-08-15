import { apiService } from 'common/services';
import { APP_API } from '../constants';

class AppService {
  /**
   * upload
   * @param requestBody
   */
  upload(configs, requestBody) {
    return apiService.post(APP_API.UPLOAD, requestBody, configs);
  }
}

export const appService = new AppService();
