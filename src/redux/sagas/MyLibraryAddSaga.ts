import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { MyLibraryAddTypes } from 'types/api';
import {
  MyLibraryAddFail,
  MyLibraryAddSuccess,
  MY_LIBRARY_ADD_REQUEST,
} from '../reducers/MyLibrary';

function MyLibraryAddAPI(data: MyLibraryAddTypes) {
  return instance.post(`${process.env.REACT_APP_BASIC_URL}/book/mylist`, data);
}

function* fetchMyLibraryAddSaga(action: any) {
  try {
    yield call(MyLibraryAddAPI, action.payload);
    yield put(MyLibraryAddSuccess());
  } catch (error) {
    yield put(MyLibraryAddFail(error));
  }
}

export default function* watchMyLibraryAdd() {
  yield takeEvery(MY_LIBRARY_ADD_REQUEST, fetchMyLibraryAddSaga);
}
