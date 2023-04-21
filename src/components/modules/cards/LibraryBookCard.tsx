import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { LibraryItemTypes } from 'types/book';
import { LibraryBookCardTypes } from 'types/module';
import { ParagraphInitRequest } from 'redux/reducers/Paragraph';
import { UserReviewRequest } from 'redux/reducers/UserReview';
import { MyLibraryDeleteRequest } from 'redux/reducers/MyLibrary';
import useToggle from 'hooks/useToggle';
import { SetStartDate } from 'lib/SetDate';
import MoveDeleteModal from 'common/DefaultModal';
import ImageButton from 'components/atoms/buttons/ImageButton';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import DefaultImage from 'components/atoms/images/DefaultImage';
import DefaultText from 'components/atoms/texts/DefaultText';
import DataText from 'components/atoms/texts/DataText';

function LibraryBookCard({
  id,
  img,
  progress,
  title,
  author,
  publisher,
  startTime,
  endTime,
  handleLikeToggle,
  handleCommentToggle,
  handleReviewToggle,
  onClick,
}: LibraryItemTypes & LibraryBookCardTypes) {
  const dispatch = useDispatch();
  const [deleteToggle, deleteToggleIsOn] = useToggle(false);

  const handleStartClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    handleLikeToggle();
    onClick(id);
  };

  const handleParagraphClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    handleCommentToggle();
    onClick(id);
    dispatch(ParagraphInitRequest({ bookId: id }));
  };

  const handleReviewClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    handleReviewToggle();
    onClick(id);
    dispatch(UserReviewRequest({ bookId: id }));
  };

  const handleDeleteItem = () => {
    dispatch(MyLibraryDeleteRequest({ id }));
    deleteToggleIsOn();
  };

  return (
    <LibraryBookCardContainer>
      <BookImage>
        <ImageButton
          src={`${process.env.PUBLIC_URL}/assets/func/trash.svg`}
          handleClick={deleteToggleIsOn}
          imgSize={25}
        />
        <DefaultImage
          className="bookimage"
          imageSrc={img}
          imageAlt="book"
          pc={[100, 140]}
        />
      </BookImage>
      <BookInfoContainer>
        <BookInfo>
          <DefaultText
            className="booktitle"
            content={title.replaceAll('<b>', '').replaceAll('</b>', '')}
            fontSize={1.4}
            fontWeight={700}
          />
          <DefaultText
            className="bookauth"
            content={author.replaceAll('<b>', '').replaceAll('</b>', '')}
            fontColor={theme.color.COLOR_CORAL}
            fontSize={1.4}
          />
          <DefaultText
            className="bookauth"
            content={publisher.replaceAll('<b>', '').replaceAll('</b>', '')}
            fontSize={1.4}
          />
          {startTime && (
            <DataText
              before="독서 시작:"
              data={SetStartDate(startTime)}
              fontSize={1.2}
            />
          )}
          {endTime && (
            <DataText
              before="독서 완료:"
              data={SetStartDate(endTime)}
              fontSize={1.2}
            />
          )}
        </BookInfo>
        <LibraryCardButtons>
          {progress === 0 && (
            <DefaultButton
              handleClick={handleStartClick}
              fontSize={1.4}
              content="시작하기"
              width="auto"
            />
          )}
          {(progress === 1 || progress === 2) && (
            <DefaultButton
              handleClick={handleParagraphClick}
              fontSize={1.4}
              content="기록하기"
              width="auto"
            />
          )}
          {progress === 2 && (
            <DefaultButton
              handleClick={handleReviewClick}
              fontSize={1.4}
              content="리뷰하기"
              width="auto"
            />
          )}
        </LibraryCardButtons>
      </BookInfoContainer>
      {deleteToggle && (
        <MoveDeleteModal
          content="정말 삭제하시겠습니까?"
          contentSize={2.4}
          width={500}
          height={250}
          handleToggle={deleteToggleIsOn}
          close
          okButtonTitle="삭제"
          cancelButtonTitle="나중에"
          handleOkClick={handleDeleteItem}
          handleCanCelClick={deleteToggleIsOn}
        />
      )}
    </LibraryBookCardContainer>
  );
}

export default LibraryBookCard;

const LibraryBookCardContainer = styled.div`
  margin-top: 10px;
  display: flex;
  border: 2px solid ${({ theme }) => theme.color.COLOR_CORAL};
  border-radius: 5px;
`;

const BookImage = styled.div`
  position: relative;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.COLOR_CORAL};
  width: 120px;
  height: 180px;
  padding: 20px 10px;
  button {
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }
  :hover button {
    display: block;
  }
`;

const BookInfoContainer = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const BookInfo = styled.div`
  .booktitle {
    height: 40px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bookauth {
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const LibraryCardButtons = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  button {
    height: 30px;
  }
`;
