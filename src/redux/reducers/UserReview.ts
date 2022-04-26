import {
  DeleteType,
  UserReviewAddTypes,
  UserReviewModifyTypes,
  UserReviewTypes,
} from 'types/api';

export const USER_REVIEW_REQUEST = 'USER_REVIEW_REQUEST';
export const USER_REVIEW_SUCCESS = 'USER_REVIEW_SUCCESS';
export const USER_REVIEW_FAIL = 'USER_REVIEW_FAIL';

export const USER_REVIEW_ADD_REQUEST = 'USER_REVIEW_ADD_REQUEST';
export const USER_REVIEW_ADD_SUCCESS = 'USER_REVIEW_ADD_SUCCESS';
export const USER_REVIEW_ADD_FAIL = 'USER_REVIEW_ADD_FAIL';

export const USER_REVIEW_MODIFY_REQUEST = 'USER_REVIEW_MODIFY_REQUEST';
export const USER_REVIEW_MODIFY_SUCCESS = 'USER_REVIEW_MODIFY_SUCCESS';
export const USER_REVIEW_MODIFY_FAIL = 'USER_REVIEW_MODIFY_FAIL';

export const USER_REVIEW_DELETE_REQUEST = 'USER_REVIEW_DELETE_REQUEST';
export const USER_REVIEW_DELETE_SUCCESS = 'USER_REVIEW_DELETE_SUCCESS';
export const USER_REVIEW_DELETE_FAIL = 'USER_REVIEW_DELETE_FAIL';

export const USER_REVIEW_INIT = 'USER_REVIEW_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  itemAddLoading: false,
  itemAddSuccess: false,
  itemModifyLoading: false,
  itemModifySuccess: false,
  itemDeleteLoading: false,
  itemDeleteSuccess: false,
  reviewItem: {},
};

export default function Review(state = initialState, action: any) {
  switch (action.type) {
    case USER_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case USER_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case USER_REVIEW_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case USER_REVIEW_ADD_REQUEST:
      return {
        ...state,
        itemAddLoading: true,
        itemAddSuccess: false,
      };
    case USER_REVIEW_ADD_SUCCESS:
      return {
        ...state,
        itemAddLoading: false,
        itemAddSuccess: true,
      };
    case USER_REVIEW_ADD_FAIL:
      return {
        ...state,
        itemAddLoading: false,
        itemAddSuccess: false,
      };
    case USER_REVIEW_MODIFY_REQUEST:
      return {
        ...state,
        itemModifyLoading: true,
        itemModifySuccess: false,
      };
    case USER_REVIEW_MODIFY_SUCCESS:
      return {
        ...state,
        itemModifyLoading: false,
        itemModifySuccess: true,
      };
    case USER_REVIEW_MODIFY_FAIL:
      return {
        ...state,
        itemModifyLoading: false,
        itemModifySuccess: false,
      };
    case USER_REVIEW_DELETE_REQUEST:
      return {
        ...state,
        itemDeleteLoading: true,
        itemDeleteSuccess: false,
      };
    case USER_REVIEW_DELETE_SUCCESS:
      return {
        ...state,
        itemDeleteLoading: false,
        itemDeleteSuccess: true,
      };
    case USER_REVIEW_DELETE_FAIL:
      return {
        ...state,
        itemDeleteLoading: false,
        itemDeleteSuccess: false,
      };
    case USER_REVIEW_INIT:
      return initialState;
    default:
      return state;
  }
}

export const UserReviewsRequest = (data: UserReviewTypes) => {
  return {
    type: USER_REVIEW_REQUEST,
    payload: data,
  };
};

export const UserReviewsSuccess = () => {
  return {
    type: USER_REVIEW_SUCCESS,
  };
};

export const UserReviewsFail = (error: any) => {
  return {
    type: USER_REVIEW_FAIL,
    error: error.response,
  };
};

export const UserReviewAddRequest = (data: UserReviewAddTypes) => {
  return {
    type: USER_REVIEW_ADD_REQUEST,
    payload: data,
  };
};

export const UserReviewAddSuccess = () => {
  return {
    type: USER_REVIEW_ADD_SUCCESS,
  };
};

export const UserReviewAddFail = (error: any) => {
  return {
    type: USER_REVIEW_ADD_FAIL,
    error: error.response,
  };
};

export const UserReviewModifyRequest = (data: UserReviewModifyTypes) => {
  return {
    type: USER_REVIEW_MODIFY_REQUEST,
    payload: data,
  };
};

export const UserReviewModifySuccess = () => {
  return {
    type: USER_REVIEW_MODIFY_SUCCESS,
  };
};

export const UserReviewModifyFail = (error: any) => {
  return {
    type: USER_REVIEW_MODIFY_FAIL,
    error: error.response,
  };
};

export const UserReviewDeleteRequest = (data: DeleteType) => {
  return {
    type: USER_REVIEW_DELETE_REQUEST,
    payload: data,
  };
};

export const UserReviewDeleteSuccess = () => {
  return {
    type: USER_REVIEW_DELETE_SUCCESS,
  };
};

export const UserReviewDeleteFail = (error: any) => {
  return {
    type: USER_REVIEW_DELETE_FAIL,
    error: error.response,
  };
};

export const UserReviewInit = () => {
  return {
    type: USER_REVIEW_INIT,
  };
};
