// import { AxiosRequestConfig } from 'axios';

export interface RequestFunc {
  (token: string): void;
}
export interface EnvConfig {
  [key: string]: {
    baseUrl: string;
  };
}

export interface LoginParams {
  username: string;
  password: string;
  captcha: string;
}
