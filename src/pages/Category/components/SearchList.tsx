import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BooksTypes } from 'types/book';
import SearchItem from './_item/SearchItem';

function SearchList() {
  const { books } = useSelector((state: any) => state.search);
  return (
    <Wrapper>
      {books.map((item: BooksTypes) => (
        <SearchItem key={item.isbn} {...item} />
      ))}
    </Wrapper>
  );
}

export default SearchList;

const Wrapper = styled.div`
  width: 100%;
  margin: 30px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 10px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    margin: auto;
    width: 95%;
  }
`;
