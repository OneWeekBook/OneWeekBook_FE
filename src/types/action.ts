import {
  ApiDelete,
  ApiMyLibraryAdd,
  ApiParagraph,
  ApiParagraphAdd,
  ApiReivewDetail,
  ApiReview,
  ApiSearch,
  ApiSignIn,
  ApiSignUp,
  ApiUserReviewAdd,
} from './api';

interface ActionType {
  type: string;
}

export interface ActionSignin extends ActionType {
  payload: ApiSignIn;
}

export interface ActionSignup extends ActionType {
  payload: ApiSignUp;
}

export interface ActionSearch extends ActionType {
  payload: ApiSearch;
}

export interface ActionCode extends ActionType {
  payload: {
    code: string;
  };
}

export interface ActionEmail extends ActionType {
  payload: {
    email: string;
  };
}

export interface ActionChangeNick extends ActionType {
  payload: {
    nick: string;
  };
}

export interface ActionChangePassword extends ActionType {
  payload: {
    password: string;
  };
}

export interface ActionLikeAdd extends ActionType {
  payload: {
    bookId: number;
    state: number;
  };
}

export interface ActionLikeCancel extends ActionType {
  payload: { bookId: number };
}

export interface ActionLike extends ActionType {
  payload: { bookId: number };
}

export interface ActionMyLibrary extends ActionType {
  payload: { progress: number };
}

export interface ActionMyLibraryAdd extends ActionType {
  payload: ApiMyLibraryAdd;
}

export interface ActionMyLibraryModify extends ActionType {
  payload: { progress: number; isbn: string };
}

export interface ActionMyLibraryDelete extends ActionType {
  payload: { id: number };
}

export interface ActionParagraph extends ActionType {
  payload: ApiParagraph;
}

export interface ActionParagraphAdd extends ActionType {
  payload: ApiParagraphAdd;
}

export interface ActionParagraphDelete extends ActionType {
  payload: ApiDelete;
}

export interface ActionRemoveUser extends ActionType {
  payload: {
    password: string;
  };
}

export interface ActionReviewDetail extends ActionType {
  payload: ApiReivewDetail;
}

export interface ActionReview extends ActionType {
  payload: ApiReview;
}

export interface ActionUserReview extends ActionType {
  payload: { bookId: number };
}

export interface ActionUserReviewAdd extends ActionType {
  payload: ApiUserReviewAdd;
}

export interface ActionUserReviewModify extends ActionType {
  payload: {
    review: string;
    rating: number;
  };
}
