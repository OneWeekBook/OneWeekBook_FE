import styled from 'styled-components';
import theme from 'styles/theme';
import { TagStyleTypes, TagTypes } from 'types/atom';

function DefaultTag({ content, src, ...rest }: TagTypes & TagStyleTypes) {
  return (
    <DefaultTagAtom {...rest}>
      <img src={src} alt="tag img" />
      <p>{content}</p>
    </DefaultTagAtom>
  );
}

DefaultTag.defaultProps = {
  fontSize: 1.6,
  fontColor: theme.color.COLOR_BLACK,
  fontWeight: 500,
};

export default DefaultTag;

const DefaultTagAtom = styled.div<TagStyleTypes>`
  img {
    width: ${({ imgSize }) => imgSize}px;
    height: ${({ imgSize }) => imgSize}px;
  }
  p {
    color: ${({ fontColor }) => fontColor};
    font-size: ${({ fontSize }) => fontSize}rem;
    font-weight: ${({ fontWeight }) => fontWeight};
  }
`;
