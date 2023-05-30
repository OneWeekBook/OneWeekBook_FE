import styled from 'styled-components';
import { UserBookListType } from 'types/module';
import { UserBookResponseTypes } from 'types/response';
import UserBookCard from 'components/modules/cards/UserBookCard';

function UserBookList({ userBooks }: UserBookListType) {
  return (
    <UserBookListModule>
      {userBooks.map((item: UserBookResponseTypes) => (
        <UserBookCard key={item.id} {...item} />
      ))}
    </UserBookListModule>
  );
}

export default UserBookList;

const UserBookListModule = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin: 10px auto 50px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
