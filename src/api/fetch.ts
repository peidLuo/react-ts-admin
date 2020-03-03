import axios from 'axios';
import { RequestFunc } from './types';
import env from './env';
import Message from '@/components/Message';

function getLocalToken() {
  const token = window.localStorage.getItem('token');
  return token;
}
const instance = axios.create({
  baseURL: env.baseUrl,
  timeout: 15000,
  withCredentials: true,
  headers: {
    Authorization: getLocalToken()
  }
});

const setToken = (token: string) => {
  instance.defaults.headers['Authorization'] = token;
  window.localStorage.setItem('token', token);
};

function refreshToken() {
  return instance.post('/refreshtoken').then(res => res.data);
}

// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests: RequestFunc[] = [];

instance.interceptors.response.use(
  response => {
    const { code } = response.data;
    if (code === 1234) {
      const config = response.config;
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken()
          .then(res => {
            const { token } = res.data;
            setToken(token);
            config.headers['Authorization'] = token;
            config.baseURL = '';
            // 已经刷新了token，将所有队列中的请求进行重试
            requests.forEach(cb => cb(token));
            requests = [];
            return instance(config);
          })
          .catch(res => {
            Message.error(`refreshtoken error => ${res}`);
            window.location.href = '/';
            return response;
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        // 正在刷新token，将返回一个未执行resolve的promise
        return new Promise(resolve => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push(token => {
            config.baseURL = '';
            config.headers['Authorization'] = token;
            resolve(instance(config));
          });
        });
      }
    }
    return response;
  },
  error => Promise.reject(error)
);

export default instance;
