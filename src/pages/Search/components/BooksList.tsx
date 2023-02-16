import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { MyLibraryAddRequest } from 'redux/reducers/MyLibrary';
import { Toast } from 'lib/Toast';
import { BooksTypes } from 'types/book';
import { ApiMyLibraryAdd } from 'types/api';
import SearchItem from 'pages/Category/components/_item/SearchItem';

function BooksList() {
  const dispatch = useDispatch();
  const { books } = useSelector(
    (state: AppStateType) => state.search,
    shallowEqual,
  );
  const { user } = useSelector(
    (state: AppStateType) => state.authUser,
    shallowEqual,
  );
  const isAddSuccess = useSelector(
    (state: AppStateType) => state.myLibrary.isAddSuccess,
  );

  useEffect(() => {
    if (isAddSuccess) Toast('success', '내 서재에 추가완료~');
  }, [isAddSuccess]);

  const handleAddClick = ({
    title,
    author,
    publisher,
    isbn,
    img,
  }: ApiMyLibraryAdd) => {
    dispatch(MyLibraryAddRequest({ title, author, publisher, isbn, img }));
  };

  return (
    <Wrapper>
      {books.map((item: BooksTypes, index: number) => (
        <SearchItem
          key={index}
          {...item}
          userId={user.id}
          handleAddClick={handleAddClick}
        />
      ))}
    </Wrapper>
  );
}

export default BooksList;

const Wrapper = styled.div`
  margin: 30px auto 50px;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
    grid-template-columns: 1fr;
  }
`;
