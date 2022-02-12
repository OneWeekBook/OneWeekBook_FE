import { all, call } from 'redux-saga/effects';
import watchAuthEmail from './AuthEmailSaga';
import watchAuthCode from './AuthCodeSaga';

export default function* rootSaga() {
  yield all([call(watchAuthEmail), call(watchAuthCode)]);
}
