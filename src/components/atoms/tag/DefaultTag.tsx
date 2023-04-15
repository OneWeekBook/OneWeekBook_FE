import styled from 'styled-components';

interface TagProps {
  content: string;
  src: string;
}

interface StyleProps {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
  imgSize?: number;
}

function DefaultTag({ content, src, ...rest }: TagProps & StyleProps) {
  return (
    <DefaultTagAtom {...rest}>
      <img src={src} alt="tag img" />
      <p>{content}</p>
    </DefaultTagAtom>
  );
}

DefaultTag.defaultProps = {
  fontSize: 1.6,
  fontColor: 'black',
  fontWeight: 500,
};

export default DefaultTag;

const DefaultTagAtom = styled.div<StyleProps>`
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
