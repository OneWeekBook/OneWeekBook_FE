import axios from 'axios';
import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import {
  MyLibraryModifyFail,
  MyLibraryModifySuccess,
  MY_LIBRARY_MODIFY_REQUEST,
} from '../reducers/MyLibrary';

function MyLibraryModifyAPI(data: {
  userId: number;
  progress: number;
  isbn: string;
}) {
  return instance.put(`${process.env.REACT_APP_BASIC_URL}/book/mylist`, data);
}

function* fetchMyLibraryModifySaga(action: any): any {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(MyLibraryModifyAPI, { userId: user.id, ...action.payload });
    yield put(MyLibraryModifySuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(MyLibraryModifyFail(error));
  }
}

export default function* watchMyLibraryModify() {
  yield takeEvery(MY_LIBRARY_MODIFY_REQUEST, fetchMyLibraryModifySaga);
}
