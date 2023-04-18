import DefaultImage from 'components/atoms/images/DefaultImage';
import DefaultText from 'components/atoms/texts/DefaultText';
import styled from 'styled-components';

function LoadingForm() {
  return (
    <LoadingFormContainer>
      <DefaultImage
        imageSrc={`${process.env.PUBLIC_URL}/assets/func/book-loading-blue.svg`}
        imageAlt="loading"
        pc={[150, 150]}
      />
      <DefaultText content="Loading" fontSize={2.4} fontColor="" />
    </LoadingFormContainer>
  );
}

export default LoadingForm;

const LoadingFormContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px auto;
  p {
    font-size: 24px;
    font-weight: 500;
    color: ${({ theme }) => theme.color.COLOR_CORAL};
    text-align: center;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
  }
`;
