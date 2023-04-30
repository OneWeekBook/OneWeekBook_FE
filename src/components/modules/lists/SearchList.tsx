import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { LibraryAddRequestTypes } from 'types/request';
import { BookResponseTypes } from 'types/response';
import { AppStateType } from 'redux/reducers';
import { LibraryAddRequest } from 'redux/reducers/Library';
import { searchDone } from 'redux/reducers/Func';
import { showToast } from 'common/Toast';
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
    (state: AppStateType) => state.library.isAddSuccess,
  );

  useEffect(() => {
    if (isAddSuccess) showToast('success', '내 서재에 추가완료~');
  }, [isAddSuccess]);

  useEffect(() => {
    if (isSuccess) dispatch(searchDone());
  }, [isSuccess]);

  const handleFavoriteClick = ({ ...data }: LibraryAddRequestTypes) => {
    dispatch(LibraryAddRequest({ ...data }));
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
      {books.map((item: BookResponseTypes, index: number) => (
        <SearchBookCard
          key={index}
          {...item}
          handleFavoriteClick={handleFavoriteClick}
        />
      ))}
    </SearchListContainer>
  );
}

export default SearchList;

const SearchListContainer = styled.div`
  display: grid;
  margin-top: 30px;
  margin-bottom: 30px;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
