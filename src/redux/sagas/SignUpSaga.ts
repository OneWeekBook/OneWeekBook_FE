import axios from 'axios';
import { SignUpRequestTypes } from 'types/request';
import { call, put, takeEvery } from 'redux-saga/effects';
import { SignUpFail, SignUpSuccess, SIGN_UP_REQUEST } from '../reducers/SignUp';

function SignUpAPI(data: SignUpRequestTypes) {
  return axios.post(`${process.env.REACT_APP_BASIC_URL}/user/register`, data);
}

function* fetchSignUpSaga(action: {
  type: string;
  payload: SignUpRequestTypes;
}): object {
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
