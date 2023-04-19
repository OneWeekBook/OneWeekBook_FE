import styled from 'styled-components';
import theme from 'styles/theme';

interface MultiTextProps {
  imageSrc: string;
  imageAlt: string;
  content: string | number;
  className?: string;
}

interface StyleProps {
  imageSize?: number;
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
  flex?: string;
}

function MultiText({
  imageSrc,
  imageAlt,
  content,
  className,
  ...rest
}: MultiTextProps & StyleProps) {
  return (
    <MultiTextAtom {...rest} className={className}>
      <img src={imageSrc} alt={imageAlt} />
      <p>{content}</p>
    </MultiTextAtom>
  );
}

export default MultiText;

MultiText.defaultProps = {
  imageSize: 20,
  fontSize: 1.6,
  fontColor: theme.color.COLOR_BLACK,
  fontWeight: 500,
  flex: 'row',
};

const MultiTextAtom = styled.div<StyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ flex }) => flex};
  gap: 5px;
  img {
    width: ${({ imageSize }) => imageSize}px;
    height: ${({ imageSize }) => imageSize}px;
  }
  p {
    color: ${({ fontColor }) => fontColor};
    font-size: ${({ fontSize }) => fontSize}rem;
    font-weight: ${({ fontWeight }) => fontWeight};
  }
  &.review {
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${({ theme }) => theme.color.COLOR_CORAL};
    border-radius: 0px 0px 0px 5px;
    text-align: center;
    padding-bottom: 2px;
    width: 60px;
  }
`;
