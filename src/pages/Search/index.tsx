import React, { useEffect, useCallback } from 'react';
import Container from 'components/Container';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SearchRequest } from 'redux/reducers/Search';
import TitleWrapper from './components/TitleWrapper';
import BooksList from './components/BooksList';

function index() {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathArr = location.search.split(/[?=&]+/);
  const searchArr: string[] = [];
  const tagArr: string[] = [];

  for (let i = 1; i < pathArr.length - 2; i += 1) {
    if (i % 2 === 1) {
      tagArr.push(decodeURI(decodeURIComponent(pathArr[i])));
    } else {
      searchArr.push(decodeURI(decodeURIComponent(pathArr[i])));
    }
  }

  tagArr.push(decodeURI(decodeURIComponent(pathArr[pathArr.length - 1])));
  searchArr.push(decodeURI(decodeURIComponent(pathArr[pathArr.length - 1])));

  const handleFetch = useCallback((searchArr) => {
    if (searchArr.length === 3) {
      dispatch(
        SearchRequest({
          d_categ: searchArr[1],
          title: searchArr[2],
          start: 1,
          display: 12,
        }),
      );
    } else if (searchArr.length === 2) {
      dispatch(
        SearchRequest({
          d_categ: searchArr[0],
          title: searchArr[1],
          start: 1,
          display: 12,
        }),
      );
    } else {
      dispatch(
        SearchRequest({
          title: searchArr[0],
          start: 1,
          display: 12,
        }),
      );
    }
  }, []);

  useEffect(() => {
    handleFetch(searchArr);
  }, []);

  return (
    <Container>
      <TitleWrapper tags={tagArr} />
      <BooksList />
    </Container>
  );
}

export default index;
