import styled from 'styled-components';

function LoadingForm() {
  return (
    <LoadingWrapper>
      <img
        src={`${process.env.PUBLIC_URL}/assets/func/book-loading-blue.svg`}
        alt="loading"
        width={150}
        height={150}
      />
      <p>Loading...</p>
    </LoadingWrapper>
  );
}

export default LoadingForm;

const LoadingWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  p {
    font-size: 24px;
    font-weight: 600;
    color: #1e90ff;
    text-align: center;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
  }
`;
