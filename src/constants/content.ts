import { SLIDE_IMAGE, MENU_IMAGE } from 'constants/image';
import { PATH_URL } from './path';

export const bookInit = {
  id: -1,
  isbn: '',
  progress: 0,
  title: '',
  author: '',
  startTime: null,
  endTime: null,
};

export const categoryInit = {
  id: 0,
  parentId: null,
  categoryId: 0,
  categoryName: 'example',
  depth: 1,
};

export const libraryMenu = [
  {
    id: 0,
    desc: '좋아요',
    image: MENU_IMAGE.LIBRARY_FAVORITE,
  },
  {
    id: 1,
    desc: '읽는중',
    image: MENU_IMAGE.LIBRARY_READING,
  },
  {
    id: 2,
    desc: '다읽은',
    image: MENU_IMAGE.LIBRARY_FINISHED,
  },
];

export const menuItems = [
  {
    id: 1,
    title: '홈',
    link: PATH_URL.MAIN,
    img: MENU_IMAGE.HOME_NONE,
    clickImg: MENU_IMAGE.HOME_DONE,
  },
  {
    id: 2,
    title: '내 서재',
    link: PATH_URL.LIBRARY,
    img: MENU_IMAGE.LIBRARY_NONE,
    clickImg: MENU_IMAGE.LIBRARY_DONE,
  },
  {
    id: 3,
    title: '카테고리',
    link: PATH_URL.CATEGORY,
    img: MENU_IMAGE.CATEGORY_NONE,
    clickImg: MENU_IMAGE.CATEGORY_DONE,
  },
  {
    id: 4,
    title: '리뷰',
    link: PATH_URL.REVIEW,
    img: MENU_IMAGE.REVIEW_NONE,
    clickImg: MENU_IMAGE.REVIEW_DONE,
  },
];

export const reviewInit = {
  id: -1,
  likeCount: 0,
  nick: '',
  oneLikeCount: 0,
  rating: 4,
  review: '',
  reviewCreationTime: '',
  role: 1,
  zeroLikeCount: 0,
  userId: -1,
};

export const slidePCItems = [
  { id: 1, img: SLIDE_IMAGE.SLIDE_PC_1 },
  { id: 2, img: SLIDE_IMAGE.SLIDE_PC_2 },
];

export const slideMobileItems = [
  { id: 1, img: SLIDE_IMAGE.SLIDE_MOBILE_1 },
  { id: 2, img: SLIDE_IMAGE.SLIDE_MOBILE_2 },
];
