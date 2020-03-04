import { call, put } from 'redux-saga/effects';
import { login } from '@/api/sys';
import { LoginParams } from '@/api/types';

export function* fetchData(params: LoginParams) {
  try {
    const data = yield call(login, params);
    yield put({ type: 'LOGIN_SUCCEEDED', data });
  } catch (error) {
    yield put({ type: 'LOGIN_FAILED', error });
  }
}
