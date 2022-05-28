import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NewReviewTypes } from 'types/main';
import NewReivewItem from './NewReivewItem';

function NewReviewList() {
  const { newReviews } = useSelector((state: any) => state.newReview);

  return (
    <Wrapper>
      <NewReviewTitleWrapper>
        <NewReviewTitle>따끈따끈한 새 리뷰</NewReviewTitle>
        <Link to="/review">모두 보기</Link>
      </NewReviewTitleWrapper>
      <NewReviewListWrapper>
        {newReviews.length > 0 && newReviews.slice(0, 5).map((item: NewReviewTypes) => (
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
