import styled from 'styled-components';
import { IconType, IconStyleType } from 'types/atom';
import { STAR_IMAGE } from 'constants/image';

function StarIcon({ score, imageSize }: IconType & IconStyleType) {
  if (score === 1) {
    return (
      <StarIconAtom
        src={STAR_IMAGE.STAR_FULL}
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
            ? STAR_IMAGE.STAR_ONE_THIRD
            : score % 1 > 0.5
            ? STAR_IMAGE.STAR_TWO_THIRD
            : STAR_IMAGE.STAR_HALF
        }
        alt="star score"
        imageSize={imageSize}
      />
    );
  }
  return (
    <StarIconAtom
      src={STAR_IMAGE.STAR_EMPTY}
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
