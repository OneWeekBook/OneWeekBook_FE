import styled from 'styled-components';
import { IconType, IconStyleType } from 'types/atom';

function StarIcon({ score, imageSize }: IconType & IconStyleType) {
  if (score === 1) {
    return (
      <StarIconAtom
        src={`${process.env.PUBLIC_URL}/assets/func/star-full.png`}
        alt="star full"
        imageSize={imageSize}
      />
    );
  }
  if (score > 0 && score < 1) {
    return (
      <StarIconAtom
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
  return (
    <StarIconAtom
      src={`${process.env.PUBLIC_URL}/assets/func/star-empty.png`}
      alt="star empty"
      imageSize={imageSize}
    />
  );
}

export default StarIcon;

const StarIconAtom = styled.img<IconStyleType>`
  width: ${({ imageSize }) => imageSize}px;
  height: ${({ imageSize }) => imageSize}px;
`;