import { combineReducers } from 'redux';
import authEmail from './AuthEmail';
import authCode from './AuthCode';
import authUser from './AuthUser';
import signUp from './SignUp';
import signIn from './SignIn';
import category from './Category';

const rootReducer = combineReducers({
  authEmail,
  authCode,
  authUser,
  signUp,
  signIn,
  category,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
