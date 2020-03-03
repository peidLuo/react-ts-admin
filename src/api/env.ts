import { EnvConfig } from './types';

const {
  VUE_APP_ENV,
  VUE_APP_MOCK
}: { VUE_APP_ENV: string; VUE_APP_MOCK: string } = process.env;

const config: EnvConfig = {
  dev: {
    baseUrl: '//xxx.com/api'
  },
  qa: {
    baseUrl: '//xxx.com/api'
  },
  migrate: {
    baseUrl: '//xxx.com/api'
  },
  production: {
    baseUrl: '//xxx.com'
  },
  mock: {
    // baseUrl: VUE_APP_MOCK
    baseUrl: '//127.0.0.1:5000/api'
    // baseUrl: '//xxx.com/api'
    // baseUrl: '//xxx.com/api'
  }
};

const KEY = VUE_APP_ENV === 'local' && VUE_APP_MOCK ? 'mock' : VUE_APP_ENV;

export default config[KEY];
