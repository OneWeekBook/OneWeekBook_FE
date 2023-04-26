import { UserReviewResponseTypes } from './response';

export interface ChangeNickModalType {
  nickToggleIsOn: () => void;
}

export interface ChangePassModalType {
  passToggleIsOn: () => void;
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
  toggleIsOn: () => void;
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
  removeToggleIsOn: () => void;
}

export interface WriteReviewTypes {
  bookData: LibraryBookTypes;
  toggleIsOn: () => void;
}
