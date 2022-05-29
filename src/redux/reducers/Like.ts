import { LikeTypes } from 'types/api';

export const LIKE_REQUEST = 'LIKE_REQUEST';
export const LIKE_SUCCESS = 'LIKE_SUCCESS';
export const LIKE_FAIL = 'LIKE_FAIL';

export const LIKE_ADD_REQUEST = 'LIKE_ADD_REQUEST';
export const LIKE_ADD_SUCCESS = 'LIKE_ADD_SUCCESS';
export const LIKE_ADD_FAIL = 'LIKE_ADD_FAIL';

const initialState = {
  isLoading: false,
  isSuccess: false,
  likeErrorStatus: null,
  likeErrorMsg: '',
  likeData: [],
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
        likeData: action.data.likeData
      };
    case LIKE_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        likeErrorStatus: action.error.status,
        likeErrorMsg: action.error.data.message,
      };
    case LIKE_ADD_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        likeErrorStatus: null,
        likeErrorMsg: '',
      };
    case LIKE_ADD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        likeErrorStatus: 200,
        likeErrorMsg: '',
      };
    case LIKE_ADD_FAIL:
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

export const LikeRequest = (data: {bookId: number}) => {
  return {
    type: LIKE_REQUEST,
    payload: data,
  };
};

export const LikeSuccess = (data: any) => {
  return {
    type: LIKE_SUCCESS,
    data,
  };
};

export const LikeFail = (error: any) => {
  return {
    type: LIKE_FAIL,
    error: error.response,
  };
};
export const LikeAddRequest = (data: LikeTypes) => {
  return {
    type: LIKE_ADD_REQUEST,
    payload: data,
  };
};

export const LikeAddSuccess = () => {
  return {
    type: LIKE_ADD_SUCCESS,
  };
};

export const LikeAddFail = (error: any) => {
  return {
    type: LIKE_ADD_FAIL,
    error: error.response,
  };
};
