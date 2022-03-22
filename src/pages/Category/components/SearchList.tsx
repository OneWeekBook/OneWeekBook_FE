import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { BooksTypes } from 'types/book';
import SearchItem from './_item/SearchItem';

function SearchList() {
  const { books } = useSelector((state: any) => state.search);
  return (
    <Wrapper>
      {books.map((item: BooksTypes, index: number) => (
        <SearchItem key={index} {...item} />
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
  gap: 20px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
