import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  LibraryFail,
  LibrarySuccess,
  LIBRARY_REQUEST,
} from 'redux/reducers/Library';

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
    const user = yield select((state) => state.authUser.user);
    const result = yield call(libraryAPI, {
      userId: user.id,
      ...action.payload,
    });
    yield put(LibrarySuccess(result.data.myList));
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(LibraryFail(error));
  }
}

export default function* watchLibrary() {
  yield takeEvery(LIBRARY_REQUEST, fetchLibrarySaga);
}
