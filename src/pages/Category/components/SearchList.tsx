import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BooksTypes } from 'types/book';
import { AppStateType } from 'redux/reducers';
import { MyLibraryAddRequest } from 'redux/reducers/MyLibrary';
import { searchDone } from 'redux/reducers/Func';
import { Toast } from 'lib/Toast';
import { MyLibraryAddTypes } from 'types/api';
import LoadingErrorForm from 'components/Form/LoadingErrorForm';
import LoadingForm from 'components/Form/LoadingForm';
import SearchItem from './_item/SearchItem';
import NoneItem from './_item/NoneItem';

function SearchList() {
  const dispatch = useDispatch();
  const { books, isLoading, isSuccess } = useSelector(
    (state: AppStateType) => state.search,
  );
  const { search } = useSelector((state: AppStateType) => state.func);
  const { user } = useSelector((state: AppStateType) => state.authUser);
  const { isAddSuccess } = useSelector(
    (state: AppStateType) => state.myLibrary,
  );

  useEffect(() => {
    if (isAddSuccess) Toast('success', '내 서재에 추가완료~');
  }, [isAddSuccess]);

  useEffect(() => {
    if (isSuccess) dispatch(searchDone());
  }, [isSuccess]);

  const handleAddClick = ({
    title,
    author,
    publisher,
    isbn,
    img,
    userId,
  }: MyLibraryAddTypes) => {
    if (userId) {
      dispatch(
        MyLibraryAddRequest({
          title,
          author,
          publisher,
          isbn,
          img,
          userId,
        }),
      );
    }
  };

  if (isLoading) return <LoadingForm />;

  if ((!isLoading && !isSuccess) || !search) return <NoneItem type="init" />;

  if (!isLoading && isSuccess && books.length === 0)
    return <NoneItem type="fail" />;

  if (isLoading && !isSuccess) return <LoadingErrorForm />;

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

export default SearchList;

const Wrapper = styled.div`
  width: 100%;
  margin: 30px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
