import axios from 'axios';
import { InternalAxiosRequestConfig } from 'axios';
import { getCookie } from './auth';

let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
  baseUrl = import.meta.env.VITE_API_BASE_URL;
}

// 给axios扩展一些属性
declare module 'axios' {
  interface AxiosRequestConfig {
    noCookie?: boolean;
  }
}

const server = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
});
// 请求拦截器
server.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    if (!config.params)
      config.params = {};
    if (!config.noCookie && getCookie('MUSIC_U') !== null) {
      config.params.cookie = `MUSIC_U=${getCookie('MUSIC_U')}`;
    }
    if (config.noCookie) {
      config.params.noCookie = true;
    }
    return config;
  },
  (err: any) => {
    Promise.reject(err);
  }
);

// 响应拦截器
server.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

export default server;
