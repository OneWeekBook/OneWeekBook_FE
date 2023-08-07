import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  libraryFail,
  librarySuccess,
  LIBRARY_REQUEST,
  libraryInit,
} from 'redux/reducers/libraryReducer';

export function libraryAPI(params: { userId: number; progress: number }) {
  return instance.get(
    `${API_URL.LIBRARY}?userId=${params.userId}&progress=${params.progress}`,
  );
}

export function* fetchLibrarySaga(action: {
  type: string;
  payload: { progress: number };
}): object {
  try {
    yield put(libraryInit());
    const user = yield select((state) => state.authUser.user);
    const result = yield call(libraryAPI, {
      userId: user.id,
      ...action.payload,
    });
    yield put(librarySuccess(result.data.myList));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(libraryFail(error));
  }
}

export default function* watchLibrary() {
  yield takeEvery(LIBRARY_REQUEST, fetchLibrarySaga);
}
