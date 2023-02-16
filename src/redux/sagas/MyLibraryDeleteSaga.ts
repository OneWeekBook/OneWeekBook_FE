import instance from 'api/axios';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionMyLibraryDelete } from 'types/action';
import {
  MyLibraryDeleteFail,
  MyLibraryDeleteSuccess,
  MY_LIBRARY_DELETE_REQUEST,
} from '../reducers/MyLibrary';

function MyLibraryDeleteAPI(params: { id: number }) {
  return instance.delete(
    `${process.env.REACT_APP_BASIC_URL}/book/mylist?id=${params.id}`,
  );
}

function* fetchMyLibraryDeleteSaga(action: ActionMyLibraryDelete) {
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
