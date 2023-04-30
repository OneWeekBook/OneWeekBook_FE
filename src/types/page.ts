import { UserReviewResponseTypes } from './response';

export interface ChangeNickModalType {
  handleNickToggle: () => void;
}

export interface ChangePassModalType {
  handlePassToggle: () => void;
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
  handleCancelClick?: () => void;
}

export interface LibraryBookTypes {
  id: number;
  isbn: string;
  title: string;
  author: string;
  progress: number;
  startTime: string | null;
  endTime: string | null;
}

export interface ParagraphModalTypes {
  bookData: LibraryBookTypes;
  handleToggle: () => void;
  moveDoneClick?: () => void;
}

export interface ReviewDetailModalTypes {
  userReview: UserReviewResponseTypes;
  bookIsbn: number;
  reviewIndex: number;
  reviewSort: string;
  handleDetailToggle: () => void;
}

export interface RemoveUserModalType {
  handleToggle: () => void;
}

export interface WriteReviewTypes {
  bookData: LibraryBookTypes;
  handleToggle: () => void;
}
