import { LikeTypes } from 'types/api';

export const LIKE_REQUEST = 'LIKE_REQUEST';
export const LIKE_SUCCESS = 'LIKE_SUCCESS';
export const LIKE_FAIL = 'LIKE_FAIL';

const initialState = {
  isLoading: false,
  isSuccess: false,
  likeErrorStatus: null,
  likeErrorMsg: '',
};

export default function SignIn(state = initialState, action: any) {
  switch (action.type) {
    case LIKE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        likeErrorStatus: null,
        likeErrorMsg: '',
      };
    case LIKE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        likeErrorStatus: 200,
        likeErrorMsg: '',
      };
    case LIKE_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        likeErrorStatus: action.error.status,
        likeErrorMsg: action.error.data.message,
      };
    default:
      return state;
  }
}

export const LikeRequest = (data: LikeTypes) => {
  return {
    type: LIKE_REQUEST,
    payload: data,
  };
};

export const LikeSuccess = () => {
  return {
    type: LIKE_SUCCESS,
  };
};

export const LikeFail = (error: any) => {
  return {
    type: LIKE_FAIL,
    error: error.response,
  };
};
