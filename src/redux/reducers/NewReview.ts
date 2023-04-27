import { AxiosError } from 'axios';
import { ActionsTypes } from 'types/request';
import { ResponseNewReviewSuccess } from 'types/response';

export const NEW_REVIEWS_REQUEST = 'NEW_REVIEWS_REQUEST';
export const NEW_REVIEWS_SUCCESS = 'NEW_REVIEWS_SUCCESS';
export const NEW_REVIEWS_FAIL = 'NEW_REVIEWS_FAIL';

export const NEW_REVIEW_INIT = 'NEW_REVIEW_INIT';

const initialState = {
  isLoading: false,
  isSuccess: false,
  newReviews: [],
};

export default function Review(state = initialState, action: ActionsTypes) {
  switch (action.type) {
    case NEW_REVIEWS_REQUEST:
      return {
        ...state,
        isNewLoading: true,
        isNewSuccess: false,
      };
    case NEW_REVIEWS_SUCCESS:
      return {
        ...state,
        isNewLoading: false,
        isNewSuccess: true,
        newReviews: action.payload.reviews,
      };
    case NEW_REVIEWS_FAIL:
      return {
        ...state,
        isNewLoading: false,
        isNewSuccess: false,
      };
    case NEW_REVIEW_INIT:
      return initialState;
    default:
      return state;
  }
}

export const NewReviewsRequest = () => {
  return {
    type: NEW_REVIEWS_REQUEST,
  };
};

export const NewReviewsSuccess = (data: ResponseNewReviewSuccess) => {
  return {
    type: NEW_REVIEWS_SUCCESS,
    payload: data,
  };
};

export const NewReviewsFail = (error: AxiosError) => {
  return {
    type: NEW_REVIEWS_FAIL,
    error: error.response,
  };
};

export const NewReviewInit = () => {
  return {
    type: NEW_REVIEW_INIT,
  };
};
