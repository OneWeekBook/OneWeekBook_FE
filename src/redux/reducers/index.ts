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
import func from './Func';
import removeUser from './RemoveUser';
import myLibrary from './MyLibrary';
import paragraph from './Paragraph';
import review from './Review';
import newReview from './NewReview';
import userReview from './UserReview';
import like from './Like';

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
  func,
  removeUser,
  myLibrary,
  paragraph,
  review,
  newReview,
  userReview,
  like,
});

export default rootReducer;

export type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;
