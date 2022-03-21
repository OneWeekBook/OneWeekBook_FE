export const ReviewDetailItem = {
  id: 1,
  img: `${process.env.PUBLIC_URL}/assets/main-bestlist-book.png`,
  title: '책이름 1',
  author: '김땡땡',
  rating: 7.8,
  recommendRate: 6,
  total: 3,
  totalRecommend: ['시간가는 줄 모르는', '재미있는'],
  recommendReviews: [
    {
      id: 3,
      reviewer: 'lee**',
      age: 20,
      isRecommend: true,
      reviewDate: '2022.02.01',
      summary: 'ㅋㅋㄹㅃㅃ',
      overall:
        '루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕',
      recommends: 23,
    },
    {
      id: 2,
      reviewer: 'kee**',
      age: 30,
      isRecommend: false,
      reviewDate: '2022.01.31',
      summary: 'ㅋㅋㄹㅃㅃ',
      overall:
        '루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕',
      recommends: 21,
    },
    {
      id: 1,
      reviewer: 'lee**',
      age: 20,
      isRecommend: true,
      reviewDate: '2022.02.27',
      summary: 'ㅋㅋㄹㅃㅃ',
      overall:
        '루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕루삥뽕',
      recommends: 19,
    },
  ],
};

export type ReviewDetailItemTypes = {
  id: number;
  reviewer: string;
  isRecommend: boolean;
  reviewDate: string;
  overall: string;
  summary: string;
  recommends: number;
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
