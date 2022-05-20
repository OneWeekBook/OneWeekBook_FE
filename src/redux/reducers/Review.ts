import { ReviewTypes } from 'types/api';

export const REVIEWS_REQUEST = 'REVIEWS_REQUEST';
export const REVIEWS_SUCCESS = 'REVIEWS_SUCCESS';
export const REVIEWS_FAIL = 'REVIEWS_FAIL';

export const REVIEW_REQUEST = 'REVIEW_REQUEST';
export const REVIEW_SUCCESS = 'REVIEW_SUCCESS';
export const REVIEW_FAIL = 'REVIEW_FAIL';

export const REVIEW_INIT = 'REVIEW_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  itemLoading: false,
  itemSuccess: false,
  reviews: [],
  bookData: {},
  reviewCount: 0,
  ratingAverage: 0,
  like: {},
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
        reviews: action.data.reviews,
        bookData: action.data.bookData,
        reviewCount: action.data.reviewCount,
        ratingAverage: action.data.ratingAverage,
        like: action.data.like,
      };
    case REVIEW_FAIL:
      return {
        ...state,
        itemLoading: false,
        itemSuccess: false,
      };
    case REVIEW_INIT:
      return initialState;
    default:
      return state;
  }
}

export const ReviewsRequest = (data: ReviewTypes) => {
  return {
    type: REVIEWS_REQUEST,
    params: data,
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

export const ReviewRequest = (data: { isbn: number }) => {
  return {
    type: REVIEW_REQUEST,
    data,
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

export const ReviewInit = () => {
  return {
    type: REVIEW_INIT,
  };
};
