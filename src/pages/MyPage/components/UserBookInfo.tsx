import styled from 'styled-components';
import UserBookItem from './_items/UserBookItem';

export interface userBooksType {
  id: number;
  title: string;
  author: string;
  publisher: string;
  img: string;
  isbn: string;
  progress: number;
  startTime: string;
  endTime: string;
  review: string;
  rating: number;
  reviewCreationTime: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

interface PropsType {
  nickName: string;
  userBooks: userBooksType[];
}

function UserBookInfo({ nickName, userBooks }: PropsType) {
  return (
    <div>
      <NickName>
        <span>{nickName}</span>님이 읽으신 책
      </NickName>
      <BookGridWrapper>
        {userBooks.map((item: userBooksType) => (
          <UserBookItem key={item.id} {...item} />
        ))}
      </BookGridWrapper>
    </div>
  );
}

export default UserBookInfo;

const NickName = styled.p`
  margin: 20px auto;
  font-size: 24px;
  span {
    color: #f07055;
    font-size: 26px;
    font-weight: 700;
  }
`;

const BookGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 50px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
