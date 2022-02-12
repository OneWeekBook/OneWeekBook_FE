import { combineReducers } from 'redux';
import authEmail from './AuthEmail';
import authCode from './AuthCode';

const rootReducer = combineReducers({
  authEmail,
  authCode,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
