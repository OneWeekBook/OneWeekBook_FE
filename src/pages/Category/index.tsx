import React from 'react';
import Container from 'components/Container';
import CategoryList from './components/CategoryList';
import SearchList from './components/SearchList';

function index() {
  return (
    <Container>
      <CategoryList />
      <SearchList />
    </Container>
  );
}

export default index;
