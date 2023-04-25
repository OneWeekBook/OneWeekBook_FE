import { call, put, takeEvery } from 'redux-saga/effects';
import { SignInRequestTypes } from 'types/request';
import axios from 'axios';
import instance from 'api/axios';
import { SignInFail, SignInSuccess, SIGN_IN_REQUEST } from '../reducers/SignIn';

function SignInAPI(data: SignInRequestTypes) {
  return axios.post(`${process.env.REACT_APP_BASIC_URL}/user/login`, data);
}

function* fetchSignInSaga(action: any): any {
  try {
    const result = yield call(SignInAPI, action.payload);
    yield put(SignInSuccess(result.data));
    sessionStorage.setItem('accessToken', result.data.accessToken);
    instance.defaults.headers.common.Authorization = result.data.accessToken;
  } catch (error) {
    yield put(SignInFail(error));
  }
}

export default function* watchSignIn() {
  yield takeEvery(SIGN_IN_REQUEST, fetchSignInSaga);
}
