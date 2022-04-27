import instance from 'api/axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { DeleteType } from 'types/api';
import {
  ParagraphDeleteFail,
  ParagraphDeleteSuccess,
  PARAGRAPH_DELETE_REQUEST,
} from '../reducers/Paragraph';

function ParagraphDeleteAPI(data: DeleteType) {
  return instance.delete(
    `${process.env.REACT_APP_BASIC_URL}/book/paragraph?id=${data.id}`,
  );
}

function* fetchParagraphDeleteSaga(action: any) {
  try {
    yield call(ParagraphDeleteAPI, action.payload);
    yield put(ParagraphDeleteSuccess());
  } catch (error) {
    yield put(ParagraphDeleteFail(error));
  }
}

export default function* watchParagraphDelete() {
  yield takeEvery(PARAGRAPH_DELETE_REQUEST, fetchParagraphDeleteSaga);
}
