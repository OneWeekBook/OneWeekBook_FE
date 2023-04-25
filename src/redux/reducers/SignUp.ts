import { SignUpRequestTypes, ActionsTypes } from 'types/request';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAIL = 'SIGN_UP_FAIL';

export const SIGN_UP_INIT = 'SIGN_UP_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  signUpErrorStatus: null,
  signUpErrorMsg: '',
};

export default function SignUp(state = initialState, action: ActionsTypes) {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        signUpErrorStatus: null,
        signUpErrorMsg: '',
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        signUpErrorStatus: 200,
        signUpErrorMsg: '',
      };
    case SIGN_UP_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        signUpErrorStatus: action.error.status,
        signUpErrorMsg: action.error.data.message,
      };
    case SIGN_UP_INIT:
      return initialState;
    default:
      return state;
  }
}

export const SignUpRequest = (data: SignUpRequestTypes) => {
  return {
    type: SIGN_UP_REQUEST,
    payload: data,
  };
};

export const SignUpSuccess = (data: any) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload: data,
  };
};

export const SignUpFail = (error: any) => {
  return {
    type: SIGN_UP_FAIL,
    error: error.response,
  };
};

export const SignUpInit = () => {
  return {
    type: SIGN_UP_INIT,
  };
};
