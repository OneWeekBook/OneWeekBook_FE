import { SignInTypes } from 'types/api';

export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_IN_FAIL = 'SIGN_IN_FAIL';

const initialState = {
  isLoading: false,
  isSuccess: false,
  signInErrorStatus: null,
  signInErrorMsg: '',
};

export default function SignIn(state = initialState, action: any) {
  switch (action.type) {
    case SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        signInErrorStatus: null,
        signInErrorMsg: '',
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        signInErrorStatus: 200,
        signInErrorMsg: '',
      };
    case SIGN_IN_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        signInErrorStatus: action.error.status,
        signInErrorMsg: action.error.data.message,
      };
    default:
      return state;
  }
}

export const SignInRequest = (data: SignInTypes) => {
  return {
    type: SIGN_IN_REQUEST,
    payload: data,
  };
};

export const SignInSuccess = (data: any) => {
  return {
    type: SIGN_IN_SUCCESS,
    data,
  };
};

export const SignInFail = (error: any) => {
  return {
    type: SIGN_IN_FAIL,
    error: error.response,
  };
};
