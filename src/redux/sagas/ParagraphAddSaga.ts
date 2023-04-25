import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ParagraphAddRequestTypes } from 'types/request';
import {
  ParagraphAddFail,
  ParagraphAddSuccess,
  PARAGRAPH_ADD_REQUEST,
} from '../reducers/Paragraph';

function ParagraphAddAPI(data: ParagraphAddRequestTypes) {
  return instance.post(
    `${process.env.REACT_APP_BASIC_URL}/book/paragraph`,
    data,
  );
}

function* fetchParagraphAddSaga(action: any) {
  try {
    yield call(ParagraphAddAPI, action.payload);
    yield put(ParagraphAddSuccess());
  } catch (error) {
    yield put(ParagraphAddFail(error));
  }
}

export default function* watchParagraphAdd() {
  yield takeEvery(PARAGRAPH_ADD_REQUEST, fetchParagraphAddSaga);
}
