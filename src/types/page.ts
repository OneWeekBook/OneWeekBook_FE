import { ReviewDetailTypes } from './review';

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
