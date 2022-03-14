import Container from 'components/Container';
import React from 'react';
import { useSelector } from 'react-redux';
import CategoryList from './components/CategoryList';

function index() {
  const { books } = useSelector((state: any) => state.search);
  console.log(books);
  return (
    <Container>
      <CategoryList />
    </Container>
  );
}

export default index;
