import instance from 'api/axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { LibraryAddRequestTypes } from 'types/api';
import {
  MyLibraryAddFail,
  MyLibraryAddSuccess,
  MY_LIBRARY_ADD_REQUEST,
} from '../reducers/MyLibrary';

function MyLibraryAddAPI(data: { userId: number & LibraryAddRequestTypes }) {
  return instance.post(`${process.env.REACT_APP_BASIC_URL}/book/mylist`, data);
}

function* fetchMyLibraryAddSaga(action: any): any {
  try {
    const user = yield select((state) => state.authUser.user);
    yield call(MyLibraryAddAPI, { userId: user.id, ...action.payload });
    yield put(MyLibraryAddSuccess());
  } catch (error) {
    yield put(MyLibraryAddFail(error));
  }
}

export default function* watchMyLibraryAdd() {
  yield takeEvery(MY_LIBRARY_ADD_REQUEST, fetchMyLibraryAddSaga);
}
