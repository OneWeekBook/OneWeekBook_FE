import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  AuthUserFail,
  AuthUserSuccess,
  AUTH_USER_REQUEST,
} from '../reducers/AuthUser';

function AuthUserAPI() {
  return instance.get('/user');
}

function UserLibraryAPI(params: { userId: number; progress: number }) {
  return instance.get(
    `${process.env.REACT_APP_BASIC_URL}/book/mylist?userId=${params.userId}&progress=${params.progress}`,
  );
}

function* fetchAuthUserSaga(): object {
  try {
    const userData = yield call(AuthUserAPI);
    const bookData = yield call(UserLibraryAPI, {
      userId: userData.data.user.id,
      progress: 2,
    });
    const result = {
      userData: userData.data.user,
      bookData: bookData.data.myList,
    };
    yield put(AuthUserSuccess(result));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(AuthUserFail(error));
  }
}

export default function* watchAuthUser() {
  yield takeLatest(AUTH_USER_REQUEST, fetchAuthUserSaga);
}
