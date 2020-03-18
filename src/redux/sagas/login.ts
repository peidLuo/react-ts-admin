import { call, put, takeEvery } from 'redux-saga/effects';
import { login } from '@/api/sys';
import { LoginAction } from '@/redux/store/Login/actions';
import { LOGIN_REQUEST } from '@/redux/store/Login/actions';

function* loginAsync({ payload }: LoginAction) {
  try {
    const data = yield call(login, payload);
    yield put({ type: 'LOGIN_SUCCEEDED', data });
  } catch (error) {
    yield put({ type: 'LOGIN_FAILED', error });
  }
}

export default function* loginSaga() {
  yield takeEvery(LOGIN_REQUEST, loginAsync);
}
