import styled from 'styled-components';
import theme from 'styles/theme';
import { DefaultTextTypes, TextStyleTypes } from 'types/atom';

function DefaultText({
  content,
  className,
  ...rest
}: DefaultTextTypes & TextStyleTypes) {
  return (
    <DefaultTextAtom className={className} {...rest}>
      {content}
    </DefaultTextAtom>
  );
}

DefaultText.defaultProps = {
  fontSize: 1.6,
  fontColor: theme.color.COLOR_BLACK,
  fontWeight: 500,
  align: 'left',
  reactive: false,
};

export default DefaultText;

const DefaultTextAtom = styled.p<TextStyleTypes>`
  padding: ${({ padding }) => padding}px;
  color: ${({ fontColor }) => fontColor};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize}rem;
  text-align: ${({ align }) => align};
  &.review {
    font-weight: 300;
    white-space: pre-wrap;
  }
  &.tagbox {
    padding: 2px 10px;
    font-weight: 500;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.color.COLOR_CORAL};
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    font-size: ${({ fontSize, reactive }) =>
      reactive && fontSize && fontSize - 0.2}rem;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: ${({ fontSize, reactive }) =>
      reactive && fontSize && fontSize - 0.4}rem;
  }
`;
