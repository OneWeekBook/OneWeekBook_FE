import styled from 'styled-components';
import { RecommendFormTypes } from 'types/module';
import DefaultText from 'components/atoms/texts/DefaultText';
import StarImage from 'components/atoms/images/StarImage';

function RecommendForm({ recommend, setRecommend }: RecommendFormTypes) {
  return (
    <RecommendFormModule>
      <DefaultText content="별점 :" />
      <ImageButtonWrapper>
        {[1, 2, 3, 4, 5].map((item) => (
          <button type="button" key={item} onClick={() => setRecommend(item)}>
            <StarImage score={recommend >= item ? 1 : 0} pc={[20, 20]} />
          </button>
        ))}
      </ImageButtonWrapper>
    </RecommendFormModule>
  );
}

export default RecommendForm;

const RecommendFormModule = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-right: 5px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    p {
      display: none;
    }
  }
`;

const ImageButtonWrapper = styled.div`
  display: flex;
  gap: 2px;
  button {
    background: ${({ theme }) => theme.color.COLOR_WHITE};
    border: none;
    height: 20px;
  }
`;
