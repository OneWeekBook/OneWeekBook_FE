export const AUTH_CODE_REQUEST = 'AUTH_CODE_REQUEST';
export const AUTH_CODE_SUCCESS = 'AUTH_CODE_SUCCESS';
export const AUTH_CODE_FAIL = 'AUTH_CODE_FAIL';

export const AUTH_CODE_INIT = 'AUTH_CODE_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  codeErrorStatus: null,
  codeErrorMsg: '',
};

export default function AuthCode(state = initialState, action: any) {
  switch (action.type) {
    case AUTH_CODE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        codeErrorStatus: 0,
        codeErrorMsg: '',
      };
    case AUTH_CODE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        codeErrorStatus: 200,
        codeErrorMsg: '',
      };
    case AUTH_CODE_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        codeErrorStatus: action.error.status,
        codeErrorMsg: action.error.data.message,
      };
    case AUTH_CODE_INIT:
      return initialState;
    default:
      return state;
  }
}

export const AuthCodeRequest = (data: { code: string }) => {
  return {
    type: AUTH_CODE_REQUEST,
    payload: data,
  };
};

export const AuthCodeSuccess = () => {
  return {
    type: AUTH_CODE_SUCCESS,
  };
};

export const AuthCodeFail = (error: any) => {
  return {
    type: AUTH_CODE_FAIL,
    error: error.response,
  };
};

export const AuthCodeInit = () => {
  return {
    type: AUTH_CODE_INIT,
  };
};
