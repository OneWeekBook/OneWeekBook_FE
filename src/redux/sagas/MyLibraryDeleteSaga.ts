import axios from 'axios';
import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from 'constants/path';
import {
  MyLibraryDeleteFail,
  MyLibraryDeleteSuccess,
  MY_LIBRARY_DELETE_REQUEST,
} from 'redux/reducers/MyLibrary';

function MyLibraryDeleteAPI(params: { id: number }) {
  return instance.delete(`${API_URL.LIBRARY}?id=${params.id}`);
}

function* fetchMyLibraryDeleteSaga(action: {
  type: string;
  payload: { id: number };
}) {
  try {
    yield call(MyLibraryDeleteAPI, action.payload);
    yield put(MyLibraryDeleteSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(MyLibraryDeleteFail(error));
  }
}

export default function* watchMyLibraryDelete() {
  yield takeEvery(MY_LIBRARY_DELETE_REQUEST, fetchMyLibraryDeleteSaga);
}
