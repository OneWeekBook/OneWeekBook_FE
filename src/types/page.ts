import { InfoTypes } from './book';
import { ReviewDetailTypes } from './review';

export interface ChangeNickModalType {
  nickToggleIsOn: () => void;
}

export interface ChangePassModalType {
  passToggleIsOn: () => void;
}

export interface ParagraphModalTypes {
  bookData: InfoTypes;
  toggleIsOn: () => void;
  moveDoneClick?: () => void;
}

export interface DefaultModalTypes {
  width: number;
  height: number;
  close: boolean;
  content: string;
  contentSize: number;
  subContent?: string;
  okButtonTitle?: string;
  cancelButtonTitle?: string;
  type?: string;
  handleToggle: () => void;
  handleOkClick?: () => void;
  handleCanCelClick?: () => void;
}

export interface ReviewDetailModalTypes {
  userReview: ReviewDetailTypes;
  bookIsbn: number;
  reviewIndex: number;
  reviewSort: string;
  handleDetailToggle: () => void;
}

export interface RemoveUserModalType {
  removeToggleIsOn: () => void;
}

export interface WriteReviewTypes {
  bookData: InfoTypes;
  toggleIsOn: () => void;
}
