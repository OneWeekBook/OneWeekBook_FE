import { useDispatch } from 'react-redux';
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

  const handleParagraphInfo = () => {
    dispatch(ParagraphInitRequest({ bookId: id }));
  };

  const handleReviewInfo = () => {
    dispatch(UserReviewRequest({ bookId: id }));
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
            pc={[30, 30]}
            imgPC={[30, 30]}
          />
          <img src={img} alt="book" />
        </ImgWrapper>
        <InfoWrapper>
          <div>
            <p>{title.replaceAll('<b>', '').replaceAll('</b>', '')}</p>
            <p>{author.replaceAll('<b>', '').replaceAll('</b>', '')}</p>
            <p>{publisher.replaceAll('<b>', '').replaceAll('</b>', '')}</p>
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
  border: 2px solid #f07055;
  border-radius: 5px;
`;

const ImgWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  background-color: #f07055;
  flex-shrink: 0;
  width: 120px;
  height: 180px;
  text-align: center;
  padding-top: 15px;
  button {
    position: absolute;
    top: 0;
    display: none;
  }
  img {
    width: 90%;
    height: 90%;
    border-radius: 0px 5px 5px 0px;
    vertical-aline: middle;
  }
  :hover {
    button {
      display: block;
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  p {
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 700;
    font-size: 14px;
    color: #070707;
    &:nth-child(1) {
      font-size: 16px;
      -webkit-line-clamp: 2;
    }
    &:nth-child(2) {
      color: #f07055;
    }
  }
  .date {
    font-size: 14px;
    font-weight: 500;
  }
`;
