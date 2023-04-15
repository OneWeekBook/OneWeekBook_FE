import styled from 'styled-components';

interface LabelProps {
  score: number;
}

interface StyleProps {
  imageSize: number;
}

function StarCountLabel({ score, imageSize }: LabelProps & StyleProps) {
  if (score === 1) {
    return (
      <StarCountAtom
        src={`${process.env.PUBLIC_URL}/assets/func/star-full.png`}
        alt="star full"
        imageSize={imageSize}
      />
    );
  }
  if (score > 0 && score < 1) {
    return (
      <StarCountAtom
        src={
          score % 1 < 0.5
            ? `${process.env.PUBLIC_URL}/assets/func/star-one-third.png`
            : score % 1 > 0.5
            ? `${process.env.PUBLIC_URL}/assets/func/star-two-third.png`
            : `${process.env.PUBLIC_URL}/assets/func/star-half.png`
        }
        alt="star score"
        imageSize={imageSize}
      />
    );
  }
  if (score === 0) {
    return (
      <StarCountAtom
        src={`${process.env.PUBLIC_URL}/assets/func/star-empty.png`}
        alt="star empty"
        imageSize={imageSize}
      />
    );
  }
}

export default StarCountLabel;

const StarCountAtom = styled.img<StyleProps>`
  width: ${({ imageSize }) => imageSize};
  height: ${({ imageSize }) => imageSize};
`;
