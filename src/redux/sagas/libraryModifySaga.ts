import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  LibraryModifyFail,
  LibraryModifySuccess,
  LIBRARY_MODIFY_REQUEST,
} from 'redux/reducers/Library';

function libraryModifyAPI(data: {
  userId: number;
  progress: number;
  isbn: string;
}) {
  return instance.put(API_URL.LIBRARY, data);
}

function* fetchLibraryModifySaga(action: {
  type: string;
  payload: { progress: number; isbn: string };
}): object {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(libraryModifyAPI, { userId: user.id, ...action.payload });
    yield put(LibraryModifySuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(LibraryModifyFail(error));
  }
}

export default function* watchLibraryModify() {
  yield takeEvery(LIBRARY_MODIFY_REQUEST, fetchLibraryModifySaga);
}
