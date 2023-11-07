import axios from 'axios';
import { ElMessage } from 'element-plus';

let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://localhost:4000';
}

const server = axios.create({
  baseURL: baseUrl,
  timeout: 15000,
});
// 请求拦截器
server.interceptors.request.use(
  (config) => {
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
