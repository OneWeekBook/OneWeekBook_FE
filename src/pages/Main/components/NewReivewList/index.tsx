import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NewReviewItemTypes } from 'types/main';
import NewReivewItem from './NewReivewItem';

const NewReivewListItems = [
  {
    id: 1,
    title: '거인의 포트폴리오',
    auth: '강환국',
    subTitle: '가나다라마바사아자차카타파하',
    reviewer: 'Le***',
    overall:
      '대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳',
    review: 22,
    recommend: 34,
  },
  {
    id: 2,
    title: '달러구트 꿈 백화점',
    auth: '이미예',
    subTitle: '가나다라마바사아자차카타파하',
    reviewer: 'Le***',
    overall:
      '대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳',
    review: 17,
    recommend: 27,
  },
  {
    id: 3,
    title: '밤의 피크닉',
    auth: '온다 리쿠',
    subTitle: '가나다라마바사아자차카타파하',
    reviewer: 'Su***',
    overall:
      '대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳',
    review: 12,
    recommend: 21,
  },
  {
    id: 4,
    title: '지구 끝의 온실',
    auth: '김초엽',
    subTitle: '가나다라마바사아자차카타파하',
    reviewer: 'Pa***',
    overall:
      '대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳, 대충 내용 출력되는 곳',
    review: 10,
    recommend: 19,
  },
];

function NewReviewList() {
  return (
    <Wrapper>
      <NewReviewTitleWrapper>
        <NewReviewTitle>따끈따끈한 새 리뷰</NewReviewTitle>
        <Link to="/">More</Link>
      </NewReviewTitleWrapper>
      <NewReviewListWrapper>
        {NewReivewListItems.map((item: NewReviewItemTypes) => (
          <NewReivewItem key={item.id} {...item} />
        ))}
      </NewReviewListWrapper>
    </Wrapper>
  );
}

export default NewReviewList;

const Wrapper = styled.div`
  margin: 50px auto;
  width: 100%;
  height: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
`;

const NewReviewTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  a {
    text-decoration: none;
    font-size: 18px;
    color: gray;
  }
`;

const NewReviewTitle = styled.p`
  font-size: 25px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    font-size: 20px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 18px;
  }
`;

const NewReviewListWrapper = styled.div``;
