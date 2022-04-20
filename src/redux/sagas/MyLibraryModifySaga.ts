import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { MyLibraryModifyTypes } from 'types/api';
import {
  MyLibraryModifyFail,
  MyLibraryModifySuccess,
  MY_LIBRARY_MODIFY_REQUEST,
} from '../reducers/MyLibrary';

function MyLibraryModifyAPI(data: MyLibraryModifyTypes) {
  return instance.put(`${process.env.REACT_APP_BASIC_URL}/book/mylist`, data);
}

function* fetchMyLibraryModifySaga(action: any) {
  try {
    yield call(MyLibraryModifyAPI, action.payload);
    yield put(MyLibraryModifySuccess());
  } catch (error) {
    yield put(MyLibraryModifyFail(error));
  }
}

export default function* watchMyLibraryModify() {
  yield takeEvery(MY_LIBRARY_MODIFY_REQUEST, fetchMyLibraryModifySaga);
}
