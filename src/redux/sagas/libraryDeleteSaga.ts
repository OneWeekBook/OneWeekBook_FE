import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  libraryDeleteFail,
  libraryDeleteSuccess,
  LIBRARY_DELETE_REQUEST,
} from 'redux/reducers/libraryReducer';

function libraryDeleteAPI(params: { id: number }) {
  return instance.delete(`${API_URL.LIBRARY}?id=${params.id}`);
}

function* fetchLibraryDeleteSaga(action: {
  type: string;
  payload: { id: number };
}) {
  try {
    yield call(libraryDeleteAPI, action.payload);
    yield put(libraryDeleteSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(libraryDeleteFail(error));
  }
}

export default function* watchLibraryDelete() {
  yield takeEvery(LIBRARY_DELETE_REQUEST, fetchLibraryDeleteSaga);
}
