import { EnvConfig } from './types';

const {
  REACT_APP_ENV,
  REACT_APP_MOCK_PATH
}: { REACT_APP_ENV: string; REACT_APP_MOCK_PATH: string } = process.env;

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
  }
};

const KEY =
  REACT_APP_ENV === 'local' && REACT_APP_MOCK_PATH ? 'mock' : REACT_APP_ENV;

export default config[KEY];
