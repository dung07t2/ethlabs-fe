import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
// import { store } from './store';
// const { dispatch } = store;

export const axiosConfigs = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  timeout: 50000
};

class ServiceSingleton {
  private static instance: AxiosInstance;
  // public static dispatch = dispatch;

  /**
   * Singleton's constuctor must be private
   */
  private constructor() {}

  // getInstance ==============================================================
  public static getInstance(): AxiosInstance {
    if (!ServiceSingleton.instance) {
      ServiceSingleton.instance = Axios.create(axiosConfigs);
      ServiceSingleton.setupAxiosInterceptors();
    }
    return ServiceSingleton.instance;
  }

  // setupAxiosInterceptors ====================================================
  private static setupAxiosInterceptors() {
    // interceptors request
    ServiceSingleton.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config;
      },
      (error: AxiosError): Promise<Error> => {
        return Promise.reject(error);
      }
    );

    // interceptors response
    ServiceSingleton.instance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        return response;
      },
      (error: AxiosError): Promise<Error> => {
        return Promise.reject(error);
      }
    );
  }
}

const apiService = ServiceSingleton.getInstance();

export { apiService };
