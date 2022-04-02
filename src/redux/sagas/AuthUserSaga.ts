import { instance } from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  AuthUserFail,
  AuthUserSuccess,
  AUTH_USER_REQUEST,
} from '../reducers/AuthUser';

function AuthUserAPI() {
  return instance.get("/user");
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
