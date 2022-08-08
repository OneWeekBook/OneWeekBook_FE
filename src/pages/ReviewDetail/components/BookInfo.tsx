import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import BookInfoWrapper from './_items/BookInfoWrapper';

function BookInfo() {
  const { bookData } = useSelector(
    (state: AppStateType) => state.review,
    shallowEqual,
  );
  return (
    <Wrapper>{bookData.title && <BookInfoWrapper {...bookData} />}</Wrapper>
  );
}

export default BookInfo;

const Wrapper = styled.div`
  margin: 10px auto 50px;
  width: 100%;
  min-height: 200px;
  height: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    margin: 10px auto 30px;
    width: 95%;
  }
`;
