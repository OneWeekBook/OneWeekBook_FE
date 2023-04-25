import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ParagraphRequestType } from 'types/api';
import {
  ParagraphFail,
  ParagraphInitFail,
  ParagraphInitSuccess,
  ParagraphSuccess,
  PARAGRAPH_INIT_REQUEST,
  PARAGRAPH_REQUEST,
} from '../reducers/Paragraph';

function ParagraphAPI(params: ParagraphRequestType) {
  return instance.get(
    `${process.env.REACT_APP_BASIC_URL}/book/paragraph?bookId=${params.bookId}`,
  );
}

function* fetchParagraphInitSaga(action: any): any {
  try {
    const result = yield call(ParagraphAPI, action.payload);
    yield put(ParagraphInitSuccess(result.data.paragraphs));
  } catch (error) {
    yield put(ParagraphInitFail(error));
  }
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
  yield takeEvery(PARAGRAPH_INIT_REQUEST, fetchParagraphInitSaga);
}
