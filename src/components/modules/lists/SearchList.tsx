import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { MyLibraryAddTypes } from 'types/api';
import { BooksTypes } from 'types/book';
import { AppStateType } from 'redux/reducers';
import { MyLibraryAddRequest } from 'redux/reducers/MyLibrary';
import { searchDone } from 'redux/reducers/Func';
import { Toast } from 'lib/Toast';
import DefaultText from 'components/atoms/texts/DefaultText';
import LoadingForm from 'components/modules/commons/LoadingForm';
import SearchBookCard from 'components/modules/cards/SearchBookCard';
import NoneBookInfoCard from 'components/modules/cards/NoneBookCard';

function SearchList() {
  const dispatch = useDispatch();
  const { books, isLoading, isSuccess } = useSelector(
    (state: AppStateType) => state.search,
    shallowEqual,
  );
  const search = useSelector((state: AppStateType) => state.func.search);
  const isAddSuccess = useSelector(
    (state: AppStateType) => state.myLibrary.isAddSuccess,
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
  }: MyLibraryAddTypes) => {
    dispatch(
      MyLibraryAddRequest({
        title,
        author,
        publisher,
        isbn,
        img,
      }),
    );
  };

  if (isLoading) return <LoadingForm />;

  if ((!isLoading && !isSuccess) || !search)
    return <NoneBookInfoCard type="init" />;

  if (!isLoading && isSuccess && books.length === 0)
    return <NoneBookInfoCard type="fail" />;

  if (isLoading && !isSuccess)
    return (
      <DefaultText
        content="요청한 데이터를 가져올 수 없습니다."
        fontColor={theme.color.COLOR_RED}
      />
    );

  return (
    <SearchListContainer>
      {books.map((item: BooksTypes, index: number) => (
        <SearchBookCard key={index} {...item} handleAddClick={handleAddClick} />
      ))}
    </SearchListContainer>
  );
}

export default SearchList;

const SearchListContainer = styled.div`
  width: 100%;
  display: grid;
  margin: 30px auto;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
    grid-template-columns: 1fr;
  }
`;
