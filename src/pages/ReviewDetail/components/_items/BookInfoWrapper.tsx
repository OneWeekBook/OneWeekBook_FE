import React from 'react';
import styled from 'styled-components';
import PieChart from 'components/Form/PieChartForm';
import { ReviewDetailItem } from 'db/reviewdetail';

function BookInfoWrapper() {
  return (
    <Wrapper>
      <BookInfoBox>
        <ImgWrapper>
          <img src={ReviewDetailItem.img} alt="book img" />
        </ImgWrapper>
        <InfoWrapper>
          <div>
            <p className="bookTitle">{ReviewDetailItem.title}</p>
            <p className="bookAuthor">
              {ReviewDetailItem.author}
              <span>2020.01.01</span>
            </p>
          </div>
          <p className="reviewTotal">
            전체 리뷰: <span>{ReviewDetailItem.total}</span>
          </p>
        </InfoWrapper>
      </BookInfoBox>
      <ProgressWrapper>
        <PieChart title="추천 비율" rate={ReviewDetailItem.recommendRate} />
        <PieChart title="전체 평점" rate={ReviewDetailItem.rating} />
      </ProgressWrapper>
    </Wrapper>
  );
}

export default BookInfoWrapper;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #08c1e9;
  border: 2px solid #1e90ff;
  height: 200px;
  padding: 0 30px;
  margin-bottom: 5px;
`;

const BookInfoBox = styled.div`
  display: flex;
`;

const ImgWrapper = styled.div`
  background-color: lightcoral;
  width: 120px;
  height: 150px;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15px;
  .bookTitle {
    font-size: 24px;
    font-weight: 600;
  }
  .bookAuthor {
    font-size: 20px;
    font-weight: 500;
    span {
      font-size: 18px;
      padding-left: 5px;
    }
  }
  .reviewTotal {
    font-size: 20px;
    span {
      font-weight: 600;
    }
  }
`;

const ProgressWrapper = styled.div`
  display: flex;
`;
