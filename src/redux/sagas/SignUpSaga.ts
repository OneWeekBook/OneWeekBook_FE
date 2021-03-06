import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { SignUpTypes } from 'types/api';
import { SignUpFail, SignUpSuccess, SIGN_UP_REQUEST } from '../reducers/SignUp';

function SignUpAPI(data: SignUpTypes) {
  return axios.post(`${process.env.REACT_APP_BASIC_URL}/user/register`, data);
}

function* fetchSignUpSaga(action: any): any {
  try {
    const result = yield call(SignUpAPI, action.payload);
    yield put(SignUpSuccess(result));
  } catch (error) {
    yield put(SignUpFail(error));
  }
}

export default function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, fetchSignUpSaga);
}
