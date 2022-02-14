import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  AuthUserFail,
  AuthUserSuccess,
  AUTH_USER_REQUEST,
} from '../reducers/AuthUser';

function AuthUserAPI() {
  const config = {
    headers: {
      Authorization: sessionStorage.getItem('accessToken'),
    },
  };

  return axios.get(`${process.env.REACT_APP_BASIC_URL}/user`, config);
}

function* fetchAuthUserSaga(): any {
  try {
    const result = yield call(AuthUserAPI);
    yield put(AuthUserSuccess(result));
  } catch (error) {
    yield put(AuthUserFail(error));
  }
}

export default function* watchAuthUser() {
  yield takeEvery(AUTH_USER_REQUEST, fetchAuthUserSaga);
}
