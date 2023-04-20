import styled from 'styled-components';
import { userBooksTypes } from 'types/main';
import { UserBookListType } from 'types/module';
import UserBookCard from 'components/modules/cards/UserBookCard';

function UserBookList({ userBooks }: UserBookListType) {
  return (
    <BookGridWrapper>
      {userBooks.map((item: userBooksTypes) => (
        <UserBookCard key={item.id} {...item} />
      ))}
    </BookGridWrapper>
  );
}

export default UserBookList;

const BookGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 10px auto 50px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
