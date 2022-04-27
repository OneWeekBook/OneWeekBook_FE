import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ParagraphType } from 'types/api';
import {
  ParagraphFail,
  ParagraphSuccess,
  PARAGRAPH_REQUEST,
} from '../reducers/Paragraph';

function ParagraphAPI(params: ParagraphType) {
  return instance.get(
    `${process.env.REACT_APP_BASIC_URL}/book/paragraph?bookId=${params.bookId}`,
  );
}

function* fetchParagraphSaga(action: any): any {
  try {
    const result = yield call(ParagraphAPI, action.payload);
    yield put(ParagraphSuccess(result.data.paragraphs));
  } catch (error) {
    yield put(ParagraphFail(error));
  }
}

export default function* watchParagraph() {
  yield takeEvery(PARAGRAPH_REQUEST, fetchParagraphSaga);
}
