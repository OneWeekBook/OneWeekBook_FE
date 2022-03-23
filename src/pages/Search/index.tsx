import React, { useEffect, useCallback, useState } from 'react';
import Container from 'components/Container';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AddSearchRequest,
  SearchInit,
  SearchRequest,
} from 'redux/reducers/Search';
import styled from 'styled-components';
import LoadingForm from 'components/Form/LoadingForm';
import LoadingErrorForm from 'components/Form/LoadingErrorForm';
import TitleWrapper from './components/TitleWrapper';
import BooksList from './components/BooksList';

function index() {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathArr = location.search.split(/[?=&]+/);
  const searchArr: string[] = [];
  const tagArr: string[] = [];
  const [startIdx, setStartIdx] = useState<number>(1);
  const { isLoading, isSuccess } = useSelector((state: any) => state.search);

  for (let i = 1; i < pathArr.length - 2; i += 1) {
    if (i % 2 === 1) {
      tagArr.push(decodeURI(decodeURIComponent(pathArr[i])));
    } else {
      searchArr.push(decodeURI(decodeURIComponent(pathArr[i])));
    }
  }

  tagArr.push(decodeURI(decodeURIComponent(pathArr[pathArr.length - 1])));
  searchArr.push(decodeURI(decodeURIComponent(pathArr[pathArr.length - 1])));

  const handleFetch = useCallback(() => {
    const options: {
      start: number;
      display: number;
      d_categ?: string | number;
      title?: string;
    } = {
      start: 1,
      display: 12,
    };

    if (searchArr.length === 3) {
      options.d_categ = searchArr[1].toString();
      options.title = searchArr[2].toString();
    } else if (searchArr.length === 2) {
      options.d_categ = searchArr[0].toString();
      options.title = searchArr[1].toString();
    } else {
      options.title = searchArr[0].toString();
    }

    dispatch(SearchRequest({ ...options }));
    setStartIdx(startIdx + 12);
  }, []);

  const handleAddFetch = useCallback(() => {
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
    } else if (searchArr.length === 2) {
      options.d_categ = searchArr[0].toString();
      options.title = searchArr[1].toString();
    } else {
      options.title = searchArr[0].toString();
    }

    dispatch(AddSearchRequest({ ...options }));
    setStartIdx(startIdx + 12);
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
        <MoreButton type="button" onClick={handleAddFetch}>
          더 보기
        </MoreButton>
      )}
    </Container>
  );
}

export default index;

const MoreButton = styled.button`
  width: 100%;
  height: 50px;
  margin-bottom: 30px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  background-color: #08c1e9;
  color: white;
`;
