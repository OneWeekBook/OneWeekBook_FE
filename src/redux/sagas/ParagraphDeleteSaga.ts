import instance from 'api/axios';
import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { ActionParagraphDelete } from 'types/action';
import { ApiDelete } from 'types/api';
import {
  ParagraphDeleteFail,
  ParagraphDeleteSuccess,
  PARAGRAPH_DELETE_REQUEST,
} from '../reducers/Paragraph';

function ParagraphDeleteAPI(data: ApiDelete) {
  return instance.delete(
    `${process.env.REACT_APP_BASIC_URL}/book/paragraph?id=${data.id}`,
  );
}

function* fetchParagraphDeleteSaga(action: ActionParagraphDelete) {
  try {
    yield call(ParagraphDeleteAPI, action.payload);
    yield put(ParagraphDeleteSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) yield put(ParagraphDeleteFail(error));
  }
}

export default function* watchParagraphDelete() {
  yield takeEvery(PARAGRAPH_DELETE_REQUEST, fetchParagraphDeleteSaga);
}
