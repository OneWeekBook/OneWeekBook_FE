import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { BooksTypes } from 'types/book';
import { MyLibraryAddTypes } from 'types/api';
import { BooksListType } from 'types/module';
import { AppStateType } from 'redux/reducers';
import { MyLibraryAddRequest } from 'redux/reducers/MyLibrary';
import { SearchInit, SearchRequest } from 'redux/reducers/Search';
import { Toast } from 'lib/Toast';
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
  const { user } = useSelector(
    (state: AppStateType) => state.authUser,
    shallowEqual,
  );
  const isAddSuccess = useSelector(
    (state: AppStateType) => state.myLibrary.isAddSuccess,
  );

  const handleFetch = useCallback(() => {
    const options: {
      start: number;
      display: number;
      d_categ?: string | number;
      title?: string;
    } = {
      start: startIdx,
      display: 12,
    };

    if (searchArr.length === 3) {
      options.d_categ = searchArr[1].toString();
      options.title = searchArr[2].toString();
    } else if (
      searchArr.length === 2 &&
      /^-?\d+$/.test(searchArr[1].toString())
    ) {
      options.d_categ = searchArr[1].toString();
      options.title = searchArr[1].toString();
    } else if (searchArr.length === 2) {
      options.d_categ = searchArr[0].toString();
      options.title = searchArr[1].toString();
    } else {
      options.title = searchArr[0].toString();
    }

    dispatch(SearchRequest({ ...options }));
    setStartIdx(startIdx + 12);
  }, [startIdx]);

  const handleFavoriteClick = ({ ...data }: MyLibraryAddTypes) => {
    dispatch(MyLibraryAddRequest({ ...data }));
  };

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && moreBooks && !isLoading) {
      handleFetch();
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  useEffect(() => {
    if (!isLoading) handleFetch();
    return () => {
      dispatch(SearchInit());
    };
  }, []);

  useEffect(() => {
    if (isAddSuccess) Toast('success', '내 서재에 추가완료~');
  }, [isAddSuccess]);

  return (
    <BookListContainer>
      <BookListGrid>
        {Array.isArray(books) &&
          !!books &&
          books.map((item: BooksTypes, index: number) => (
            <SearchBookCard
              key={index}
              {...item}
              userId={user.id}
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
    </BookListContainer>
  );
}

export default BooksList;

const BookListContainer = styled.div`
  margin: 30px auto 50px;
`;

const BookListGrid = styled.div`
  margin: auto;
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
    grid-template-columns: 1fr;
  }
`;
