import styled from 'styled-components';
import theme from 'styles/theme';
import { FUNC_IMAGE } from 'constants/image';
import DefaultImage from 'components/atoms/images/DefaultImage';
import DefaultText from 'components/atoms/texts/DefaultText';

function LoadingForm() {
  return (
    <LoadingFormModule>
      <DefaultImage
        imageSrc={FUNC_IMAGE.LOADING}
        imageAlt="loading"
        pc={[150, 150]}
      />
      <DefaultText
        content="Loading..."
        fontSize={2.4}
        fontColor={theme.color.COLOR_CORAL}
        align="center"
      />
    </LoadingFormModule>
  );
}

export default LoadingForm;

const LoadingFormModule = styled.div`
  width: 100%;
  text-align: center;
  margin: 20px auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
  }
`;
