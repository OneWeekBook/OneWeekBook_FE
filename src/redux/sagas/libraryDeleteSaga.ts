import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  libraryDeleteFail,
  libraryDeleteSuccess,
  LIBRARY_DELETE_REQUEST,
  librarySuccess,
  libraryFail,
} from 'redux/reducers/libraryReducer';
import { libraryAPI } from './librarySaga';

function libraryDeleteAPI(params: { id: number }) {
  return instance.delete(`${API_URL.LIBRARY}?id=${params.id}`);
}

function* fetchLibraryDeleteSaga(action: {
  type: string;
  payload: { id: number };
}): object {
  const params = new URLSearchParams(window.location.search);
  try {
    yield call(libraryDeleteAPI, action.payload);
    yield put(libraryDeleteSuccess());
    const user = yield select((state) => state.authUser.user);
    const result = yield call(libraryAPI, {
      userId: user.id,
      progress: Number(params.get('id')),
    });
    yield put(librarySuccess(result.data.myList));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(libraryDeleteFail(error));
      yield put(libraryFail(error));
    }
  }
}

export default function* watchLibraryDelete() {
  yield takeEvery(LIBRARY_DELETE_REQUEST, fetchLibraryDeleteSaga);
}
