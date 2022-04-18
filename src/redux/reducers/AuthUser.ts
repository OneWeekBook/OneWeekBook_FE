export const AUTH_USER_REQUEST = 'AUTH_USER_REQUEST';
export const AUTH_USER_SUCCESS = 'AUTH_USER_SUCCESS';
export const AUTH_USER_FAIL = 'AUTH_USER_FAIL';

const initialState = {
  isLoading: false,
  isSuccess: false,
  user: {},
};

export default function AuthEmail(state = initialState, action: any) {
  switch (action.type) {
    case AUTH_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case AUTH_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        user: action.payload.data.user,
        userId: action.payload.data.user.userId,
      };
    case AUTH_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    default:
      return state;
  }
}

export const AuthUserRequest = () => {
  return {
    type: AUTH_USER_REQUEST,
  };
};

export const AuthUserSuccess = (data: any) => {
  return {
    type: AUTH_USER_SUCCESS,
    payload: data,
  };
};

export const AuthUserFail = (error: any) => {
  return {
    type: AUTH_USER_FAIL,
    error: error.response,
  };
};
