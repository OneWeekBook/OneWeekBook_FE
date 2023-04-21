import styled from 'styled-components';
import { LibraryItemTypes } from 'types/book';
import { LibraryBookListTypes } from 'types/module';
import LibraryBookCard from 'components/modules/cards/LibraryBookCard';

function LibraryBookList({
  userBookList,
  handleLikeToggle,
  handleCommentToggle,
  handleReviewToggle,
  setBookData,
}: LibraryBookListTypes) {
  return (
    <LibraryBookGrid>
      {Array.isArray(userBookList) &&
        !!userBookList &&
        userBookList.map((item: LibraryItemTypes) => (
          <LibraryBookCard
            key={item.id}
            {...item}
            handleLikeToggle={handleLikeToggle}
            handleCommentToggle={handleCommentToggle}
            handleReviewToggle={handleReviewToggle}
            onClick={() => {
              setBookData({
                id: item.id,
                isbn: item.isbn,
                progress: item.progress,
                title: item.title,
                author: item.author,
                startTime: item.startTime,
                endTime: null,
              });
            }}
          />
        ))}
    </LibraryBookGrid>
  );
}

export default LibraryBookList;

const LibraryBookGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  margin: 10px auto 30px;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
