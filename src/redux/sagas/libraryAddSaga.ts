import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { LibraryAddRequestTypes } from 'types/request';
import { API_URL } from 'constants/path';
import {
  LibraryAddFail,
  LibraryAddSuccess,
  LIBRARY_ADD_REQUEST,
} from 'redux/reducers/Library';

function libraryAddAPI(data: { userId: number & LibraryAddRequestTypes }) {
  return instance.post(API_URL.LIBRARY, data);
}

function* fetchLibraryAddSaga(action: {
  type: string;
  payload: LibraryAddRequestTypes;
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(libraryAddAPI, { userId: user.id, ...action.payload });
    yield put(LibraryAddSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(LibraryAddFail(error));
  }
}

export default function* watchLibraryAdd() {
  yield takeEvery(LIBRARY_ADD_REQUEST, fetchLibraryAddSaga);
}
