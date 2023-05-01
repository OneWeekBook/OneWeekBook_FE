import styled from 'styled-components';
import theme from 'styles/theme';
import { MultiTextTypes, TextStyleTypes } from 'types/atom';

function MultiText({
  imageSrc,
  imageAlt,
  content,
  className,
  ...rest
}: MultiTextTypes & TextStyleTypes) {
  return (
    <MultiTextAtom className={className} {...rest}>
      <img src={imageSrc} alt={imageAlt} />
      <p>{content}</p>
    </MultiTextAtom>
  );
}

MultiText.defaultProps = {
  fontSize: 1.6,
  fontColor: theme.color.COLOR_BLACK,
  fontWeight: 500,
};

export default MultiText;

const MultiTextAtom = styled.div<TextStyleTypes>`
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
  &.flexstart {
    justify-content: flex-start;
  }
  &.review {
    position: absolute;
    top: 0;
    right: 0;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.color.COLOR_CORAL};
    border-radius: 0px 0px 0px 5px;
    padding-bottom: 2px;
    width: 60px;
  }
  &.reviewrole {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.color.COLOR_CORAL};
  }
`;
