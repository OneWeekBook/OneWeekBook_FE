import { AxiosError } from 'axios';
import {
  BookRequestTypes,
  ReviewRequestTypes,
  ActionsTypes,
} from 'types/request';
import { ResponseDetailSuccess, ResponseReviewSuccess } from 'types/response';

export const REVIEWS_REQUEST = 'REVIEWS_REQUEST';
export const REVIEWS_SUCCESS = 'REVIEWS_SUCCESS';
export const REVIEWS_FAIL = 'REVIEWS_FAIL';

export const REVIEW_REQUEST = 'REVIEW_REQUEST';
export const REVIEW_SUCCESS = 'REVIEW_SUCCESS';
export const REVIEW_FAIL = 'REVIEW_FAIL';

export const REVIEWS_INIT = 'REVIEWS_INIT';
export const USER_REVIEWS_INIT = 'USER_REVIEWS_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  itemLoading: false,
  itemSuccess: false,
  isNewLoading: false,
  isNewSuccess: false,
  reviews: [],
  userReviews: [],
  reivewsTotal: 0,
  reviewCount: 0,
  moreReviews: false,
  bookData: {},
};

export default function reviewReducer(
  state = initialState,
  action: ActionsTypes,
) {
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
        reviews: state.reviews.concat(action.payload.reviews),
        reivewsTotal: action.payload.countAllReviewBooks,
        moreReviews:
          action.payload.countAllReviewBooks > state.reviewCount + 15,
        reviewCount: state.reviewCount + 15,
      };
    case REVIEWS_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
      };
    case REVIEWS_INIT:
      return initialState;
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
        bookData: action.payload.bookData[0],
        userReviews: action.payload.reviewData,
      };
    case REVIEW_FAIL:
      return {
        ...state,
        itemLoading: false,
        itemSuccess: false,
      };
    case USER_REVIEWS_INIT:
      return {
        ...state,
        itemSuccess: false,
        userReviews: [],
      };
    default:
      return state;
  }
}

export const reviewsRequest = (data: ReviewRequestTypes) => {
  return {
    type: REVIEWS_REQUEST,
    payload: data,
  };
};

export const reviewsSuccess = (data: ResponseReviewSuccess) => {
  return {
    type: REVIEWS_SUCCESS,
    payload: data,
  };
};

export const reviewsFail = (error: AxiosError) => {
  return {
    type: REVIEWS_FAIL,
    error: error.response,
  };
};

export const reviewsInit = () => {
  return {
    type: REVIEWS_INIT,
  };
};

export const reviewRequest = (data: BookRequestTypes) => {
  return {
    type: REVIEW_REQUEST,
    payload: data,
  };
};

export const reviewSuccess = (data: ResponseDetailSuccess) => {
  return {
    type: REVIEW_SUCCESS,
    payload: data,
  };
};

export const reviewFail = (error: AxiosError) => {
  return {
    type: REVIEW_FAIL,
    error: error.response,
  };
};

export const userReviewsInit = () => {
  return {
    type: USER_REVIEWS_INIT,
  };
};
