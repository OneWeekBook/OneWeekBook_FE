import { DeleteType, ReviewAddTypes, ReviewModifyTypes } from 'types/api';

export const REVIEWS_REQUEST = 'REVIEWS_REQUEST';
export const REVIEWS_SUCCESS = 'REVIEWS_SUCCESS';
export const REVIEWS_FAIL = 'REVIEWS_FAIL';

export const REVIEW_REQUEST = 'REVIEW_REQUEST';
export const REVIEW_SUCCESS = 'REVIEW_SUCCESS';
export const REVIEW_FAIL = 'REVIEW_FAIL';

export const REVIEW_ADD_REQUEST = 'REVIEW_ADD_REQUEST';
export const REVIEW_ADD_SUCCESS = 'REVIEW_ADD_SUCCESS';
export const REVIEW_ADD_FAIL = 'REVIEW_ADD_FAIL';

export const REVIEW_MODIFY_REQUEST = 'REVIEW_MODIFY_REQUEST';
export const REVIEW_MODIFY_SUCCESS = 'REVIEW_MODIFY_SUCCESS';
export const REVIEW_MODIFY_FAIL = 'REVIEW_MODIFY_FAIL';

export const REVIEW_DELETE_REQUEST = 'REVIEW_DELETE_REQUEST';
export const REVIEW_DELETE_SUCCESS = 'REVIEW_DELETE_SUCCESS';
export const REVIEW_DELETE_FAIL = 'REVIEW_DELETE_FAIL';

export const REVIEW_INIT = 'REVIEW_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  itemLoading: false,
  itemSuccess: false,
  itemAddLoading: false,
  itemAddSuccess: false,
  itemModifyLoading: false,
  itemModifySuccess: false,
  itemDeleteLoading: false,
  itemDeleteSuccess: false,
  reviews: [],
  reviewItem: {},
};

export default function Review(state = initialState, action: any) {
  switch (action.type) {
    case REVIEWS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
      };
    case REVIEWS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        reviews: action.data,
      };
    case REVIEWS_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case REVIEW_REQUEST:
      return {
        ...state,
        itemLoading: true,
        itemSuccess: false,
      };
    case REVIEW_SUCCESS:
      return {
        ...state,
        itemLoading: false,
        itemSuccess: true,
        reviewItem: action.data,
      };
    case REVIEW_FAIL:
      return {
        ...state,
        itemLoading: false,
        itemSuccess: false,
      };
    case REVIEW_ADD_REQUEST:
      return {
        ...state,
        itemAddLoading: true,
        itemAddSuccess: false,
      };
    case REVIEW_ADD_SUCCESS:
      return {
        ...state,
        itemAddLoading: false,
        itemAddSuccess: true,
      };
    case REVIEW_ADD_FAIL:
      return {
        ...state,
        itemAddLoading: false,
        itemAddSuccess: false,
      };
    case REVIEW_MODIFY_REQUEST:
      return {
        ...state,
        itemModifyLoading: true,
        itemModifySuccess: false,
      };
    case REVIEW_MODIFY_SUCCESS:
      return {
        ...state,
        itemModifyLoading: false,
        itemModifySuccess: true,
      };
    case REVIEW_MODIFY_FAIL:
      return {
        ...state,
        itemModifyLoading: false,
        itemModifySuccess: false,
      };
    case REVIEW_DELETE_REQUEST:
      return {
        ...state,
        itemDeleteLoading: true,
        itemDeleteSuccess: false,
      };
    case REVIEW_DELETE_SUCCESS:
      return {
        ...state,
        itemDeleteLoading: false,
        itemDeleteSuccess: true,
      };
    case REVIEW_DELETE_FAIL:
      return {
        ...state,
        itemDeleteLoading: false,
        itemDeleteSuccess: false,
      };
    case REVIEW_INIT:
      return initialState;
    default:
      return state;
  }
}

export const ReviewsRequest = () => {
  return {
    type: REVIEWS_REQUEST,
  };
};

export const ReviewsSuccess = (data: any) => {
  return {
    type: REVIEWS_SUCCESS,
    data,
  };
};

export const ReviewsFail = (error: any) => {
  return {
    type: REVIEWS_FAIL,
    error: error.response,
  };
};

export const ReviewRequest = (data: { bookId: number }) => {
  return {
    type: REVIEW_REQUEST,
    payload: data,
  };
};

export const ReviewSuccess = (data: any) => {
  return {
    type: REVIEW_SUCCESS,
    data,
  };
};

export const ReviewFail = (error: any) => {
  return {
    type: REVIEW_FAIL,
    error: error.response,
  };
};

export const ReviewAddRequest = (data: ReviewAddTypes) => {
  return {
    type: REVIEW_ADD_REQUEST,
    payload: data,
  };
};

export const ReviewAddSuccess = () => {
  return {
    type: REVIEW_ADD_SUCCESS,
  };
};

export const ReviewAddFail = (error: any) => {
  return {
    type: REVIEW_ADD_FAIL,
    error: error.response,
  };
};

export const ReviewModifyRequest = (data: ReviewModifyTypes) => {
  return {
    type: REVIEW_MODIFY_REQUEST,
    payload: data,
  };
};

export const ReviewModifySuccess = () => {
  return {
    type: REVIEW_MODIFY_SUCCESS,
  };
};

export const ReviewModifyFail = (error: any) => {
  return {
    type: REVIEW_MODIFY_FAIL,
    error: error.response,
  };
};

export const ReviewDeleteRequest = (data: DeleteType) => {
  return {
    type: REVIEW_DELETE_REQUEST,
    payload: data,
  };
};

export const ReviewDeleteSuccess = () => {
  return {
    type: REVIEW_DELETE_SUCCESS,
  };
};

export const ReviewDeleteFail = (error: any) => {
  return {
    type: REVIEW_DELETE_FAIL,
    error: error.response,
  };
};

export const ReviewInit = () => {
  return {
    type: REVIEW_INIT,
  };
};
