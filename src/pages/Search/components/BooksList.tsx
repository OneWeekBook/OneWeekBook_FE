import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { AppStateType } from 'redux/reducers';
import { MyLibraryAddRequest } from 'redux/reducers/MyLibrary';
import { Toast } from 'lib/Toast';
import { BooksTypes } from 'types/book';
import { MyLibraryAddTypes } from 'types/api';
import SearchItem from 'components/modules/cards/SearchBookCard';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import LoadingForm from 'components/modules/commons/LoadingForm';
import { SearchInit, SearchRequest } from 'redux/reducers/Search';
import TopButton from 'components/Button/TopButton';
import DefaultText from 'components/atoms/texts/DefaultText';

interface PropsType {
  searchArr: string[];
}
function BooksList({ searchArr }: PropsType) {
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

  const isNumeric = (val: string) => {
    return /^-?\d+$/.test(val);
  };

  useEffect(() => {
    if (!isLoading) handleFetch();
    return () => {
      dispatch(SearchInit());
    };
  }, []);

  useEffect(() => {
    if (isAddSuccess) Toast('success', '내 서재에 추가완료~');
  }, [isAddSuccess]);

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
    } else if (searchArr.length === 2 && isNumeric(searchArr[1].toString())) {
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

  const handleAddClick = ({
    title,
    author,
    publisher,
    isbn,
    img,
  }: MyLibraryAddTypes) => {
    dispatch(MyLibraryAddRequest({ title, author, publisher, isbn, img }));
  };

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isIntersecting && moreBooks && !isLoading) {
      handleFetch();
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  return (
    <BookListWrapper>
      <BookGridWrapper>
        {Array.isArray(books) &&
          !!books &&
          books.map((item: BooksTypes, index: number) => (
            <SearchItem
              key={index}
              {...item}
              userId={user.id}
              handleAddClick={handleAddClick}
            />
          ))}
      </BookGridWrapper>
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
      <TopButton />
    </BookListWrapper>
  );
}

export default BooksList;

const BookListWrapper = styled.div`
  margin: 30px auto 50px;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
    grid-template-columns: 1fr;
  }
`;

const BookGridWrapper = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;
