import styled from 'styled-components';
import { StarImageType, ImageStyleTypes } from 'types/atom';
import { STAR_IMAGE } from 'constants/image';

function StarImage({ score, ...rest }: StarImageType & ImageStyleTypes) {
  if (score === 1) {
    return (
      <StarImageAtom src={STAR_IMAGE.STAR_FULL} alt="star full" {...rest} />
    );
  }
  if (score > 0 && score < 1) {
    return (
      <StarImageAtom
        src={
          score % 1 < 0.5
            ? STAR_IMAGE.STAR_ONE_THIRD
            : score % 1 > 0.5
            ? STAR_IMAGE.STAR_TWO_THIRD
            : STAR_IMAGE.STAR_HALF
        }
        alt="star score"
        {...rest}
      />
    );
  }
  return (
    <StarImageAtom src={STAR_IMAGE.STAR_EMPTY} alt="star empty" {...rest} />
  );
}

export default StarImage;

const StarImageAtom = styled.img<ImageStyleTypes>`
  width: ${({ pc }) => pc[0]}px;
  height: ${({ pc }) => pc[1]}px;
`;
