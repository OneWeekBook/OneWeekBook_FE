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
    <Wrapper style={{ backgroundImage: `url(${bookData.img})` }}>
      <Blind>{bookData.title && <BookInfoWrapper {...bookData} />}</Blind>
    </Wrapper>
  );
}

export default BookInfo;

const Wrapper = styled.div`
  background-size: cover;
  margin: 20px auto 50px;
  width: 100%;
  height: 300px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    height: 200px;
  }
`;

const Blind = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  height: 300px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    height: 200px;
  }
`;
