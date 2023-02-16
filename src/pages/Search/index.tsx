import { lazy, useEffect, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import {
  AddSearchRequest,
  SearchInit,
  SearchRequest,
} from 'redux/reducers/Search';
import LoadingForm from 'components/Form/LoadingForm';
import LoadingErrorForm from 'components/Form/LoadingErrorForm';
import DefaultButton from 'components/Button/DefaultButton';
import Container from 'components/Container';
import TitleWrapper from './components/TitleWrapper';

const BooksList = lazy(
  () => import(/* webpackChunkName: "BooksList" */ './components/BooksList'),
);

function index() {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathArr = location.search.split(/[?=&]+/);
  const searchArr: string[] = [];
  const tagArr: Set<string> = new Set([]);
  const [startIdx, setStartIdx] = useState<number>(1);
  const { isLoading, isSuccess } = useSelector(
    (state: AppStateType) => state.search,
    shallowEqual,
  );

  for (let i = 1; i < pathArr.length - 2; i += 1) {
    if (i % 2 === 1) {
      tagArr.add(decodeURI(decodeURIComponent(pathArr[i])));
    } else {
      searchArr.push(decodeURI(decodeURIComponent(pathArr[i])));
    }
  }

  tagArr.add(decodeURI(decodeURIComponent(pathArr[pathArr.length - 1])));
  searchArr.push(decodeURI(decodeURIComponent(pathArr[pathArr.length - 1])));

  const isNumeric = (val: string) => {
    return /^-?\d+$/.test(val);
  };

  const handleFetch = useCallback(() => {
    const options: {
      start: number;
      display: number;
      d_categ?: string;
      title?: string;
    } = {
      start: 1,
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
    if (options.d_categ || options.title) {
      dispatch(SearchRequest({ ...options }));
      setStartIdx(startIdx + 12);
    }
  }, []);

  const handleAddFetch = useCallback(() => {
    const options: {
      start: number;
      display: number;
      d_categ?: string;
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
    if (options.d_categ || options.title) {
      dispatch(AddSearchRequest({ ...options }));
      setStartIdx(startIdx + 12);
    }
  }, [startIdx]);

  useEffect(() => {
    if (!isLoading) handleFetch();
    return () => {
      dispatch(SearchInit());
    };
  }, []);

  return (
    <Container>
      <TitleWrapper tags={tagArr} />
      <BooksList />
      {isLoading ? (
        <LoadingForm />
      ) : !isSuccess ? (
        <LoadingErrorForm />
      ) : (
        <ButtonWrapper>
          <DefaultButton
            pc={[0, 50]}
            onClick={handleAddFetch}
            isHover
            hoverBgColor="#1e90ff"
            hoverColor="white"
            bgColor="#08c1e9"
            color="white"
            margin={[0, 0, 30, 0]}
            fontSize={[18, 18]}
            fontWeight={600}
            title="더 보기"
          />
        </ButtonWrapper>
      )}
    </Container>
  );
}

export default index;

const ButtonWrapper = styled.div`
  margin: 0 auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
  }
`;
