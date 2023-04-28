import { MENU_IMAGE } from 'constants/image';

export const NavItems = [
  {
    id: 1,
    title: '홈',
    link: '/',
    img: MENU_IMAGE.HOME_NONE,
    clickImg: MENU_IMAGE.HOME_DONE,
  },
  {
    id: 2,
    title: '내 서재',
    link: '/my-library',
    img: MENU_IMAGE.LIBRARY_NONE,
    clickImg: MENU_IMAGE.LIBRARY_DONE,
  },
  {
    id: 3,
    title: '카테고리',
    link: '/category',
    img: MENU_IMAGE.CATEGORY_DONE,
    clickImg: MENU_IMAGE.CATEGORY_NONE,
  },
  {
    id: 4,
    title: '리뷰',
    link: '/review',
    img: MENU_IMAGE.REVIEW_DONE,
    clickImg: MENU_IMAGE.REVIEW_NONE,
  },
];
