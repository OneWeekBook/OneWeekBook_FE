import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { BookResponseTypes } from 'types/response';
import { LibraryAddRequestTypes, SearchRequestTypes } from 'types/request';
import { BooksListType } from 'types/module';
import { AppStateType } from 'redux/reducers';
import { libraryAddRequest } from 'redux/reducers/libraryReducer';
import { searchInit, searchRequest } from 'redux/reducers/searchReducer';
import { showToast } from 'common/Toast';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import SearchBookCard from 'components/modules/cards/SearchBookCard';
import LoadingForm from 'components/modules/commons/LoadingForm';
import DefaultText from 'components/atoms/texts/DefaultText';

function BooksList({ searchArr }: BooksListType) {
  const dispatch = useDispatch();
  const [startIdx, setStartIdx] = useState<number>(1);
  const { books, moreBooks, isLoading, isSuccess } = useSelector(
    (state: AppStateType) => state.search,
    shallowEqual,
  );
  const { user, isAuth } = useSelector(
    (state: AppStateType) => state.authUser,
    shallowEqual,
  );
  const isAddSuccess = useSelector(
    (state: AppStateType) => state.library.isAddSuccess,
  );

  const handleFetch = useCallback(() => {
    const options: SearchRequestTypes = {
      start: startIdx,
      display: 10,
    };

    if (searchArr.length === 3) {
      options.d_categ = searchArr[1].toString();
      options.title = searchArr[2].split('/')[0].toString();
    } else if (searchArr.length === 2) {
      options.d_categ = searchArr[0].toString();
      options.title = searchArr[1].split('/')[0].toString();
    } else {
      options.title = searchArr[0].toString();
    }

    dispatch(searchRequest({ ...options }));
    setStartIdx(startIdx + 10);
  }, [startIdx]);

  const handleFavoriteClick = ({ ...data }: LibraryAddRequestTypes) => {
    dispatch(libraryAddRequest({ ...data }));
  };

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && moreBooks && !isLoading) {
      handleFetch();
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  useEffect(() => {
    return () => {
      dispatch(searchInit());
    };
  }, []);

  useEffect(() => {
    if (isAddSuccess) showToast('success', '내 서재에 추가완료~');
  }, [isAddSuccess]);

  return (
    <BookListModule>
      <BookListGrid>
        {Array.isArray(books) &&
          !!books &&
          books.map((item: BookResponseTypes, index: number) => (
            <SearchBookCard
              key={index}
              {...item}
              userId={user.id}
              isAuth={isAuth}
              handleFavoriteClick={handleFavoriteClick}
            />
          ))}
      </BookListGrid>
      <div ref={setTarget}>
        {isLoading ? (
          <LoadingForm />
        ) : (
          !isSuccess && (
            <DefaultText
              content="요청한 데이터를 가져올 수 없습니다."
              fontColor={theme.color.COLOR_RED}
            />
          )
        )}
      </div>
    </BookListModule>
  );
}

export default BooksList;

const BookListModule = styled.div`
  margin: 30px auto 50px;
`;

const BookListGrid = styled.div`
  margin: auto;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
