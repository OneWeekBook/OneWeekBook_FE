import styled from 'styled-components';
import { SetStartDate } from 'lib/SetDate';
import { LibraryItemTypes } from 'types/book';
import DefaultButton from 'components/Button/DefaultButton';

type ClickType = {
  handleToggle: () => void;
  handleReviewToggle: () => void;
  onClick: (id: number) => void;
};

function BookItem({
  id,
  img,
  progress,
  title,
  author,
  publisher,
  startTime,
  endTime,
  handleToggle,
  handleReviewToggle,
  onClick,
}: LibraryItemTypes & ClickType) {
  return (
    <Wrapper>
      <ImgWrapper>
        <img src={img} alt="book" />
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
          {startTime && <p>독서 시작: {SetStartDate(startTime)}</p>}
          {endTime && <p>독서 완료: {SetStartDate(endTime)}</p>}
        </div>
        <ButtonWrapper>
          {progress === 0 && (
            <DefaultButton
              pc={[0, 30]}
              onClick={(e) => {
                e.preventDefault();
                handleToggle();
                onClick(id);
              }}
              isHover
              hoverBgColor="#1e90ff"
              hoverColor="white"
              color="#1e90ff"
              fontSize={[14, 14]}
              fontWeight={700}
              padding={[3, 0, 3, 0]}
              title="시작하기"
            />
          )}
          {(progress === 1 || progress === 2) && (
            <DefaultButton
              pc={[0, 30]}
              onClick={(e) => {
                e.preventDefault();
                handleToggle();
                onClick(id);
              }}
              isHover
              hoverBgColor="#1e90ff"
              hoverColor="white"
              color="#1e90ff"
              fontSize={[14, 14]}
              fontWeight={700}
              padding={[3, 0, 3, 0]}
              title="기록하기"
            />
          )}
          {progress === 2 && (
            <DefaultButton
              pc={[0, 30]}
              onClick={(e) => {
                e.preventDefault();
                handleReviewToggle();
                onClick(id);
              }}
              isHover
              hoverBgColor="#1e90ff"
              hoverColor="white"
              color="#1e90ff"
              fontSize={[14, 14]}
              fontWeight={700}
              padding={[3, 0, 3, 0]}
              title="리뷰하기"
            />
          )}
        </ButtonWrapper>
      </InfoWrapper>
    </Wrapper>
  );
}

export default BookItem;

const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  width: 100%;
  .bookTitle {
    font-size: 16px;
    font-weight: 600;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bookAuthor {
    font-size: 14px;
    font-weight: 600;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: gray;
  }
  .bookPublisher {
    font-size: 14px;
    font-weight: 600;
  }
`;

const ImgWrapper = styled.div`
  flex-shrink: 0;
  width: 120px;
  height: 150px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  button {
    :nth-child(2) {
      margin-left: 10px;
    }
    border: 2px solid #1e90ff;
  }
`;
