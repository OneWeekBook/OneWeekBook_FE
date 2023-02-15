import styled from 'styled-components';
import { ReviewBookTypes } from 'types/review';
import ReviewStar from './ReviewStar';

function BookInfoWrapper({
  author,
  countReviews,
  img,
  publisher,
  ratingAverage,
  title,
}: ReviewBookTypes) {
  return (
    <Wrapper>
      <BookInfoBox>
        <BookImage>
          <img src={img} alt="book img" />
        </BookImage>
        <InfoWrapper>
          <p className="bookTitle">
            {title.replaceAll('<b>', '').replaceAll('</b>', '')}
          </p>
          <div>
            <p className="bookAuthor">
              {author.replaceAll('<b>', '').replaceAll('</b>', '')}
            </p>
            <p className="bookPublisher">
              {publisher.replaceAll('<b>', '').replaceAll('</b>', '')}
            </p>
          </div>
          <ReviewWrapper>
            <p className="reviewTotal">
              전체 리뷰: <span>{countReviews}</span>
            </p>
            <ReviewStar ratingAverage={ratingAverage} />
          </ReviewWrapper>
        </InfoWrapper>
      </BookInfoBox>
    </Wrapper>
  );
}

export default BookInfoWrapper;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1000px;
  height: 300px;
  margin: 0 auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 700px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 350px;
    height: 200px;
  }
`;

const BookInfoBox = styled.div`
  width: 100%;
  display: flex;
`;

const BookImage = styled.div`
  width: 160px;
  height: 240px;
  flex-shrink: 0;
  img {
    border-radius: 0px 5px 5px 0px;
    width: 100%;
    height: 100%;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 120px;
    height: 180px;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 15px;
  .bookTitle {
    font-size: 28px;
    font-weight: 700;
    color: #fff;
  }
  .bookAuthor {
    font-size: 24px;
    font-weight: 600;
    color: #fff;
  }
  .bookPublisher {
    font-size: 24px;
    font-weight: 600;
    color: #fff;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .bookTitle {
      font-size: 18px;
    }
    .bookAuthor {
      font-size: 14px;
    }
    .bookPublisher {
      font-size: 14px;
    }
    .reviewTotal {
      font-size: 14px;
    }
  }
`;

const ReviewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  .reviewTotal {
    font-size: 20px;
    color: #fff;
    span {
      font-weight: 700;
    }
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .reviewTotal {
      font-size: 14px;
    }
  }
`;
