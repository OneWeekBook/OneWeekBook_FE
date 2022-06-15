import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ParagraphInitRequest } from 'redux/reducers/Paragraph';
import { UserReviewRequest } from 'redux/reducers/UserReview';
import { MyLibraryDeleteRequest } from 'redux/reducers/MyLibrary';
import useToggle from 'hooks/useToggle';
import { SetStartDate } from 'lib/SetDate';
import { LibraryItemTypes } from 'types/book';
import MoveDeleteModal from 'components/Modal';
import ImageButton from 'components/Button/ImageButton';
import ButtonWrapper from './ButtonWrapper';

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
  const dispatch = useDispatch();
  const [deleteToggle, deleteToggleIsOn] = useToggle(false);
  const { user } = useSelector((state: any) => state.authUser);

  const handleParagraphInfo = () => {
    dispatch(ParagraphInitRequest({ bookId: id }));
  };

  const handleReviewInfo = () => {
    dispatch(UserReviewRequest({ userId: user.id, bookId: id }));
  };

  const handleDeleteItem = () => {
    dispatch(MyLibraryDeleteRequest({ id }));
    deleteToggleIsOn();
  };

  return (
    <>
      <Wrapper>
        <ImgWrapper>
          <ImageButton
            type="button"
            onClick={deleteToggleIsOn}
            src={`${process.env.PUBLIC_URL}/assets/func/trash.svg`}
            alt="close"
            pc={[25, 25]}
            imgPC={[25, 25]}
          />
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
            {startTime && (
              <p className="date">독서 시작: {SetStartDate(startTime)}</p>
            )}
            {endTime && (
              <p className="date">독서 완료: {SetStartDate(endTime)}</p>
            )}
          </div>
          <ButtonWrapper
            id={id}
            progress={progress}
            onClick={onClick}
            handleToggle={handleToggle}
            handleReviewToggle={handleReviewToggle}
            handleParagraphInfo={handleParagraphInfo}
            handleReviewInfo={handleReviewInfo}
          />
        </InfoWrapper>
      </Wrapper>
      {deleteToggle && (
        <MoveDeleteModal
          title="정말 삭제하시겠습니까?"
          titleSize={[24, 20]}
          width={500}
          height={250}
          handleToggle={deleteToggleIsOn}
          close
          isOkBtn
          okBtnTitle="삭제"
          handleOkClick={handleDeleteItem}
          isCancelBtn
          cancelBtnTitle="나중에..."
          handleCanCelClick={deleteToggleIsOn}
        />
      )}
    </>
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
  .date {
    font-size: 14px;
    font-weight: 500;
  }
`;

const ImgWrapper = styled.div`
  flex-shrink: 0;
  width: 120px;
  height: 150px;
  button {
    position: absolute;
    display: none;
  }
  img {
    width: 100%;
    height: 100%;
  }
  :hover {
    button {
      display: block;
    }
  }
`;
