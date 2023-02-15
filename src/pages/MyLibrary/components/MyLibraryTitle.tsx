import styled from 'styled-components';

type PropsType = {
  nick: string;
};

function MyLibraryTitle({ nick }: PropsType) {
  return (
    <Wrapper>
      <img
        src={`${process.env.PUBLIC_URL}/assets/myLibrary/my-library-icon.svg`}
        alt="book icon"
        width={60}
        height={60}
      />
      <p>{nick}님의 서재</p>
    </Wrapper>
  );
}

export default MyLibraryTitle;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px auto;
  p {
    font-size: 24px;
    font-weight: 600;
    color: #070707;
  }
`;
