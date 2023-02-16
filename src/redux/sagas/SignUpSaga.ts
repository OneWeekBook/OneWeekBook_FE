import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { ApiSignUp } from 'types/api';
import { ActionSignup } from 'types/action';
import { SignUpFail, SignUpSuccess, SIGN_UP_REQUEST } from '../reducers/SignUp';

function SignUpAPI(data: ApiSignUp) {
  return axios.post(`${process.env.REACT_APP_BASIC_URL}/user/register`, data);
}

function* fetchSignUpSaga(action: ActionSignup): object {
  try {
    const result = yield call(SignUpAPI, action.payload);
    yield put(SignUpSuccess(result));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(SignUpFail(error));
  }
}

export default function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, fetchSignUpSaga);
}
