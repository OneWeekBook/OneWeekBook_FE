export const AUTH_EMAIL_REQUEST = 'AUTH_EMAIL_REQUEST';
export const AUTH_EMAIL_SUCCESS = 'AUTH_EMAIL_SUCCESS';
export const AUTH_EMAIL_FAIL = 'AUTH_EMAIL_FAIL';

export const AUTH_EMAIL_INIT = 'AUTH_EMAIL_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  emailErrorStatus: null,
  emailErrorMsg: '',
};

export default function AuthEmail(state = initialState, action: any) {
  switch (action.type) {
    case AUTH_EMAIL_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        emailErrorStatus: 0,
        emailErrorMsg: '',
      };
    case AUTH_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        emailErrorStatus: 200,
        emailErrorMsg: '',
      };
    case AUTH_EMAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        emailErrorStatus: action.error.status,
        emailErrorMsg: action.error.data.message,
      };
    case AUTH_EMAIL_INIT:
      return initialState;
    default:
      return state;
  }
}

export const AuthEmailRequest = (data: { email: string }) => {
  return {
    type: AUTH_EMAIL_REQUEST,
    payload: data,
  };
};

export const AuthEmailSuccess = () => {
  return {
    type: AUTH_EMAIL_SUCCESS,
  };
};

export const AuthEmailFail = (error: any) => {
  return {
    type: AUTH_EMAIL_FAIL,
    error: error.response,
  };
};

export const AuthEmailInit = () => {
  return {
    type: AUTH_EMAIL_INIT,
  };
};
