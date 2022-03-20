export const ReviewDetailItem = {
  id: 1,
  img: `${process.env.PUBLIC_URL}/assets/main-bestlist-book.png`,
  title: '책이름 1',
  author: '김땡땡',
  rating: 0.98,
  total: 3,
  recommendReviews: [
    {
      id: 3,
      reviewr: 'lee**',
      age: 20,
      recommend: true,
      peroidStart: '2022.01.30',
      peroidEnd: '2022.01.31',
      reviewDate: '2022.02.01',
      overall:
        '루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕',
      athorRecommend: 23,
    },
    {
      id: 2,
      reviewr: 'kee**',
      age: 30,
      recommend: true,
      peroidStart: '2022.01.27',
      peroidEnd: '2022.01.30',
      reviewDate: '2022.01.31',
      overall:
        '루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕',
      athorRecommend: 21,
    },
    {
      id: 1,
      reviewr: 'lee**',
      age: 20,
      recommend: true,
      peroidStart: '2022.02.20',
      peroidEnd: '2022.02.25',
      reviewDate: '2022.02.27',
      overall:
        '루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕',
      athorRecommend: 19,
    },
  ],
  newReviews: [
    {
      id: 1,
      reviewr: 'lee**',
      recommend: true,
      peroidStart: '2022.02.20',
      peroidEnd: '2022.02.25',
      reviewDate: '2022.02.27',
      overall:
        '루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕',
      athorRecommend: 19,
    },
    {
      id: 2,
      reviewr: 'lee**',
      recommend: true,
      peroidStart: '2022.01.30',
      peroidEnd: '2022.01.31',
      reviewDate: '2022.02.01',
      overall:
        '루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕',
      athorRecommend: 23,
    },
    {
      id: 3,
      reviewr: 'kee**',
      recommend: true,
      peroidStart: '2022.01.27',
      peroidEnd: '2022.01.30',
      reviewDate: '2022.01.31',
      overall:
        '루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕',
      athorRecommend: 21,
    },
  ],
};

export type ReviewDetailItemTypes = {
  id: number;
  reviewr: string;
  recommend: boolean;
  peroidStart: string;
  peroidEnd: string;
  reviewDate: string;
  overall: string;
  athorRecommend: number;
};

export type ReivewDetailTypes = {
  id: number;
  img: string;
  title: string;
  author: string;
  rating: number;
  total: number;
  recommendReviews: ReviewDetailItemTypes[];
  newReviews: ReviewDetailItemTypes[];
};
