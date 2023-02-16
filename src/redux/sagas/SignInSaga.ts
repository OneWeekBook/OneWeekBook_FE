import { call, put, takeEvery } from 'redux-saga/effects';
import { ApiSignIn } from 'types/api';
import axios from 'axios';
import instance from 'api/axios';
import { ActionSignin } from 'types/action';
import { SignInFail, SignInSuccess, SIGN_IN_REQUEST } from '../reducers/SignIn';

function SignInAPI(data: ApiSignIn) {
  return axios.post(`${process.env.REACT_APP_BASIC_URL}/user/login`, data);
}

function* fetchSignInSaga(action: ActionSignin): object {
  try {
    const result = yield call(SignInAPI, action.payload);
    yield put(SignInSuccess(result.data));
    sessionStorage.setItem('accessToken', result.data.accessToken);
    instance.defaults.headers.common.Authorization = result.data.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(SignInFail(error));
  }
}

export default function* watchSignIn() {
  yield takeEvery(SIGN_IN_REQUEST, fetchSignInSaga);
}
