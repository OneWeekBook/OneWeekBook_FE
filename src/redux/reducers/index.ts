import { combineReducers } from 'redux';
import authEmail from './AuthEmail';
import authCode from './AuthCode';
import authUser from './AuthUser';
import signUp from './SignUp';
import signIn from './SignIn';
import category from './Category';
import search from './Search';
import changeNick from './ChangeNick';
import changePassword from './ChangePassword';
import funcToggle from './FuncToggle';

const rootReducer = combineReducers({
  authEmail,
  authCode,
  authUser,
  signUp,
  signIn,
  category,
  search,
  changeNick,
  changePassword,
  funcToggle,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
