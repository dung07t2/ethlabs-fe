import { TOKEN } from './constants';
import { localStorageCache } from './handle';

// - Token ------------------------------------------------
export const getToken = () => localStorageCache.retrieve(TOKEN);
export const removeToken = () => localStorageCache.remove(TOKEN);
export const setToken = (value: string) =>
  localStorageCache.store(TOKEN, value);
