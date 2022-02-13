import { combineReducers } from 'redux';
import authEmail from './AuthEmail';
import authCode from './AuthCode';
import signUp from './SignUp';
import signIn from './SignIn';

const rootReducer = combineReducers({
  authEmail,
  authCode,
  signUp,
  signIn,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
