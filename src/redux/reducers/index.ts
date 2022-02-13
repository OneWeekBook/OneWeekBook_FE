import { combineReducers } from 'redux';
import authEmail from './AuthEmail';
import authCode from './AuthCode';
import signUp from './SignUp';

const rootReducer = combineReducers({
  authEmail,
  authCode,
  signUp,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
