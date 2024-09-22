import type { LoginResult } from '@/interface/user/login';

import { message as $message } from 'antd';
import axios from 'axios';

import { clearLS, getAccessTokenFromLocalStorage, setAccessTokenToLocalStorage } from '@/utils/auth.util';
import pathUrl from '@/utils/path.util';

const baseURL = import.meta.env.VITE_BASE_API as string;

const axiosInstance = axios.create({
  timeout: 6000,
  baseURL,
});

axiosInstance.interceptors.request.use(
  config => {
    const accessToken = getAccessTokenFromLocalStorage();

    if (accessToken !== '') {
      config.headers = config.headers ?? {}; // Đảm bảo config.headers không undefined
      config.headers.Authorization = `Bearer ${accessToken}`;

      return config;
    }

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  config => {
    const { url } = config.config;

    if (url === pathUrl.login) {
      const data = config.data as LoginResult;

      setAccessTokenToLocalStorage(data.access_token);
    } else if (url === pathUrl.logout) {
      clearLS();
    }

    return config?.data;
  },
  error => {
    let errorMessage = '';

    if (error?.message?.includes('Network Error')) {
      errorMessage = 'Có lỗi xảy ra vui lòng đăng nhập lại!';
    } else {
      errorMessage = error?.message;
    }

    error.message && $message.error(errorMessage);

    return Promise.reject(error);
  },
);

export default axiosInstance;
