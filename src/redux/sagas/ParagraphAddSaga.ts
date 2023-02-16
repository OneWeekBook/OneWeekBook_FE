import instance from 'api/axios';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionParagraphAdd } from 'types/action';
import { ApiParagraphAdd } from 'types/api';
import {
  ParagraphAddFail,
  ParagraphAddSuccess,
  PARAGRAPH_ADD_REQUEST,
} from '../reducers/Paragraph';

function ParagraphAddAPI(data: ApiParagraphAdd) {
  return instance.post(
    `${process.env.REACT_APP_BASIC_URL}/book/paragraph`,
    data,
  );
}

function* fetchParagraphAddSaga(action: ActionParagraphAdd) {
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
