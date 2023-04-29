import axios from 'axios';
import instance from 'api/axios';
import { SignUpRequestTypes } from 'types/request';
import { API_URL } from 'constants/path';
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  SignUpFail,
  SignUpSuccess,
  SIGN_UP_REQUEST,
} from 'redux/reducers/SignUp';

function SignUpAPI(data: SignUpRequestTypes) {
  return instance.post(
    `${process.env.REACT_APP_BASIC_URL}${API_URL.USER_REGISTER}`,
    data,
  );
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
