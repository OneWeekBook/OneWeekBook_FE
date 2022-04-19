import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { MyLibraryTypes } from 'types/api';
import {
  MyLibraryFail,
  MyLibrarySuccess,
  MY_LIBRARY_REQUEST,
} from '../reducers/MyLibrary';

function MyLibraryAPI(params: MyLibraryTypes) {
  return instance.get(
    `${process.env.REACT_APP_BASIC_URL}/book/mylist?userId=${params.userId}&progress=${params.progress}`,
  );
}

function* fetchMyLibrarySaga(action: any): any {
  try {
    const result = yield call(MyLibraryAPI, action.payload);
    yield put(MyLibrarySuccess(result.data.myList));
  } catch (error) {
    yield put(MyLibraryFail(error));
  }
}

export default function* watchMyLibrary() {
  yield takeEvery(MY_LIBRARY_REQUEST, fetchMyLibrarySaga);
}
