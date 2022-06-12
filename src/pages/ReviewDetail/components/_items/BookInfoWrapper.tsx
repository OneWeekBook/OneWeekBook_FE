import styled from 'styled-components';
import { ReviewBookTypes } from 'types/review';
import PieChart from 'components/Form/PieChartForm';

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
        <ImgWrapper>
          <img src={img} alt="book img" />
        </ImgWrapper>
        <InfoWrapper>
          <div>
            <p className="bookTitle">
              {title.replaceAll('<b>', '').replaceAll('</b>', '')}
            </p>
            <p className="bookAuthor">
              {author.replaceAll('<b>', '').replaceAll('</b>', '')}
            </p>
            <p className="bookPublisher">
              {publisher.replaceAll('<b>', '').replaceAll('</b>', '')}
            </p>
          </div>
          <p className="reviewTotal">
            전체 리뷰: <span>{countReviews}</span>
          </p>
        </InfoWrapper>
      </BookInfoBox>
      <ProgressWrapper>
        <PieChart title="전체 평점" rate={ratingAverage} />
      </ProgressWrapper>
    </Wrapper>
  );
}

export default BookInfoWrapper;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px #e6e6e6 solid;
  border-radius: 10px;
  background-color: #f6f7f7;
  height: 200px;
  padding: 0 30px;
  margin-bottom: 5px;
`;

const BookInfoBox = styled.div`
  display: flex;
`;

const ImgWrapper = styled.div`
  background-color: lightgray;
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
    font-size: 20px;
    font-weight: 600;
  }
  .bookAuthor {
    font-size: 18px;
    font-weight: 500;
  }
  .bookPublisher {
    font-size: 16px;
    font-weight: 500;
  }
  .reviewTotal {
    font-size: 18px;
    span {
      font-weight: 600;
    }
  }
`;

const ProgressWrapper = styled.div`
  display: flex;
`;
