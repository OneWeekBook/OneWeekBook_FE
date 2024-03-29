import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  libraryModifyFail,
  libraryModifySuccess,
  LIBRARY_MODIFY_REQUEST,
  librarySuccess,
  libraryFail,
} from 'redux/reducers/libraryReducer';
import { libraryAPI } from './librarySaga';

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
    yield put(libraryModifySuccess());
    const result = yield call(libraryAPI, {
      userId: user.id,
      ...action.payload,
    });
    yield put(librarySuccess(result.data.myList));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(libraryModifyFail(error));
      yield put(libraryFail(error));
    }
  }
}

export default function* watchLibraryModify() {
  yield takeEvery(LIBRARY_MODIFY_REQUEST, fetchLibraryModifySaga);
}
