import styled from 'styled-components';
import theme from 'styles/theme';
import { DefaultLabelTypes, LabelStyleTypes } from 'types/atom';

function DefaultLabel({
  content,
  subContent,
  ...rest
}: DefaultLabelTypes & LabelStyleTypes) {
  return (
    <DefaultLabelAtom {...rest}>
      <p>{content}</p>
      {subContent && <p>{subContent}</p>}
    </DefaultLabelAtom>
  );
}

DefaultLabel.defaultProps = {
  fontSize: 1.6,
  fontColor: theme.color.COLOR_CORAL,
  fontWeight: 500,
  reactive: false,
  align: 'center',
};

export default DefaultLabel;

const DefaultLabelAtom = styled.div<LabelStyleTypes>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align};
  gap: ${({ flexGap }) => flexGap}px;
  background-color: ${({ theme }) => theme.color.COLOR_NONE};
  p {
    color: ${({ fontColor }) => fontColor};
    font-weight: ${({ fontWeight }) => fontWeight};
    font-size: ${({ fontSize }) => fontSize && fontSize - 1}rem;
    &:first-child {
      font-size: ${({ fontSize }) => fontSize}rem;
    }
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    p {
      font-size: ${({ fontSize, reactive }) =>
        reactive && fontSize && fontSize - 2}rem;
      &:first-child {
        font-size: ${({ fontSize, reactive }) =>
          reactive && fontSize && fontSize - 1}rem;
      }
    }
  }
`;
