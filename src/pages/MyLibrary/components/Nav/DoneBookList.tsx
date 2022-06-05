import { useState } from 'react';
import styled from 'styled-components';
import { useToggle } from 'hooks/useToggle';
import { InfoTypes, LibraryItemTypes } from 'types/book';
import { useDispatch, useSelector } from 'react-redux';
import { ParagraphRequest } from 'redux/reducers/Paragraph';
import BookItem from '../_item/BookItem';
import WriteCommentModal from '../Modal/WriteCommentModal';
import WriteReviewModal from '../Modal/WriteReviewModal';

type PropsType = {
  userId: number;
};

function DoneBookList({ userId }: PropsType) {
  const dispatch = useDispatch();
  const [bookId, setBookId] = useState<number>(-1);
  const [commentToggle, commentToggleIsOn] = useToggle(false);
  const [reivewToggle, reviewToggleIsOn] = useToggle(false);
  const [bookData, setBookData] = useState<InfoTypes>({
    progress: 0,
    title: '',
    author: '',
    startTime: null,
    endTime: null,
  });
  const { userBookList } = useSelector((state: any) => state.myLibrary);

  console.log(userBookList);

  const handleParagraphInfo = (id: number) => {
    dispatch(ParagraphRequest({ bookId: id }));
  };

  return (
    <>
      <Wrapper>
        {userBookList.length > 0 &&
          userBookList.map((item: LibraryItemTypes) => (
            <BookItem
              key={item.id}
              {...item}
              handleToggle={commentToggleIsOn}
              handleReviewToggle={reviewToggleIsOn}
              onClick={() => {
                setBookId(item.id);
                setBookData({
                  progress: item.progress,
                  title: item.title,
                  author: item.author,
                  startTime: item.startTime,
                  endTime: item.endTime,
                });
                handleParagraphInfo(item.id);
              }}
            />
          ))}
      </Wrapper>
      {commentToggle && bookData && (
        <WriteCommentModal
          bookId={bookId}
          bookData={bookData}
          toggleIsOn={commentToggleIsOn}
        />
      )}
      {reivewToggle && bookData && (
        <WriteReviewModal
          userId={userId}
          bookId={bookId}
          bookData={bookData}
          toggleIsOn={reviewToggleIsOn}
        />
      )}
    </>
  );
}

export default DoneBookList;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin: 10px auto 30px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
