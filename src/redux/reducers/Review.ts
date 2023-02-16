import { AxiosError } from 'axios';
import { ApiReivewDetail, ApiReview, ActionsTypes } from 'types/api';
import { IReviewDetailSuccess, IReviewSuccess } from 'types/success';

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
  isNewLoading: false,
  isNewSuccess: false,
  reviews: [],
  reivewsTotal: 0,
  bookData: {},
};

export default function Review(state = initialState, action: ActionsTypes) {
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
        reviews: action.payload.reviews,
        reivewsTotal: action.payload.countAllReviewBooks,
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
        reviews: action.payload.reviewData,
        bookData: action.payload.bookData[0],
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

export const ReviewsRequest = (data: ApiReview) => {
  return {
    type: REVIEWS_REQUEST,
    payload: data,
  };
};

export const ReviewsSuccess = (data: IReviewSuccess) => {
  return {
    type: REVIEWS_SUCCESS,
    payload: data,
  };
};

export const ReviewsFail = (error: AxiosError) => {
  return {
    type: REVIEWS_FAIL,
    error: error.response,
  };
};

export const ReviewRequest = (data: ApiReivewDetail) => {
  return {
    type: REVIEW_REQUEST,
    payload: data,
  };
};

export const ReviewSuccess = (data: IReviewDetailSuccess) => {
  return {
    type: REVIEW_SUCCESS,
    payload: data,
  };
};

export const ReviewFail = (error: AxiosError) => {
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
