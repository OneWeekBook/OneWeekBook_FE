import styled from 'styled-components';

const name = 'leejy';

function MyLibraryTitle() {
  return (
    <Wrapper>
      <img
        src={`${process.env.PUBLIC_URL}/assets/my-library-icon.svg`}
        alt="book"
        width={60}
        height={60}
      />
      <p>{name}님의 서재</p>
    </Wrapper>
  );
}

export default MyLibraryTitle;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    font-size: 25px;
    font-weight: 600;
  }
`;
