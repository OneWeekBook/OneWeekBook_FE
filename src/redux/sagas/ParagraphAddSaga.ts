import axios from 'axios';
import instance from 'api/axios';
import { ParagraphAddRequestTypes } from 'types/request';
import { call, put, takeEvery } from 'redux-saga/effects';
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

function* fetchParagraphAddSaga(action: {
  type: string;
  payload: ParagraphAddRequestTypes;
}) {
  try {
    yield call(ParagraphAddAPI, action.payload);
    yield put(ParagraphAddSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(ParagraphAddFail(error));
  }
}

export default function* watchParagraphAdd() {
  yield takeEvery(PARAGRAPH_ADD_REQUEST, fetchParagraphAddSaga);
}
