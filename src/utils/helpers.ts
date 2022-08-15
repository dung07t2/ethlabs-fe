import { isFunction } from 'lodash';
import Router, { useRouter } from 'next/router';

/**
 * redirect
 * @param path string
 * @returns void
 */
export const redirect = (path: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  Router.push(path);
};

/**
 * getCurrentUrl
 * @returns string
 */
export const GetCurrentUrl = () => {
  const router = useRouter();
  return router.asPath;
};

/**
 * parserJson
 * @param data any
 * @returns json
 */
export const parserJson = (data: any) => {
  if (!data) return;

  return JSON.parse(JSON.stringify(data));
};

/**
 * sleep
 * @param ms number
 * @returns void
 */
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * formatWalletAddress
 * @param address string
 * @returns string
 */
export const formatWalletAddress = (address: string) => {
  return address ? address.slice(0, 8) + '...' + address.slice(-8) : '';
};
/**
 * handleOutputLimitMessage
 * @param type min or max
 * @param size number
 * @returns string
 */
export const handleOutputLimitMessage = (
  size: number,
  type: 'min' | 'max' = 'max'
) => {
  return type === 'max'
    ? `Must be ${size} characters or less`
    : `Must be ${size} characters or more`;
};

/**
 * stackCallback
 * @param cb
 * @param time
 * @returns
 */
export const stackCallback = (cb: Function, time = 1000) => {
  if (!isFunction(cb)) return;
  setTimeout(() => cb(), time);
};

/**
 * findOcc
 * @param arr Array
 * @param key string
 * @returns void
 */
export const findOcc = (arr, key) => {
  const arr2 = [];
  arr.forEach(x => {
    if (arr2.some(val => val[key] == x[key])) {
      arr2.forEach(k => k[key] === x[key] && k['occurrence']++);
    } else {
      const a = {};
      a[key] = x[key];
      a['occurrence'] = 1;
      (arr2 as any).push(a);
    }
  });
  return arr2;
};

/**
 * convertToSlug
 * @param text
 * @returns string
 */
export const convertToSlug = (text: any) => {
  if (!text) return;

  // Chuyển hết sang chữ thường
  text = text.toLowerCase();

  // xóa dấu
  text = text
    .normalize('NFD') // chuyển chuỗi sang unicode tổ hợp
    .replace(/[\u0300-\u036f]/g, ''); // xóa các ký tự dấu sau khi tách tổ hợp

  // Thay ký tự đĐ
  text = text.replace(/[đĐ]/g, 'd');

  // Xóa ký tự đặc biệt
  text = text.replace(/([^0-9a-z-\s])/g, '');

  // Xóa khoảng trắng thay bằng ký tự -
  text = text.replace(/(\s+)/g, '-');

  // Xóa ký tự - liên tiếp
  text = text.replace(/-+/g, '-');

  // xóa phần dư - ở đầu & cuối
  text = text.replace(/^-+|-+$/g, '');

  // return
  return text;
};

export const getFileName = (url: string) => {
  const filename = url.substring(url.lastIndexOf('/') + 1);
  return filename;
};
