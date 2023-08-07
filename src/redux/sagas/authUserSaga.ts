import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  authUserFail,
  authUserSuccess,
  AUTH_USER_REQUEST,
} from 'redux/reducers/authUserReducer';

export function authUserAPI() {
  return instance.get(API_URL.USER);
}

export function userLibraryAPI(params: { userId: number; progress: number }) {
  return instance.get(
    `${API_URL.LIBRARY}?userId=${params.userId}&progress=${params.progress}`,
  );
}

function* fetchAuthUserSaga(): object {
  try {
    const userData = yield call(authUserAPI);
    const bookData = yield call(userLibraryAPI, {
      userId: userData.data.user.id,
      progress: 2,
    });
    const result = {
      userData: userData.data.user,
      bookData: bookData.data.myList,
    };
    yield put(authUserSuccess(result));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(authUserFail(error));
  }
}

export default function* watchAuthUser() {
  yield takeLatest(AUTH_USER_REQUEST, fetchAuthUserSaga);
}
