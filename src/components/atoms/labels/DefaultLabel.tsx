import styled from 'styled-components';
import theme from 'styles/theme';

interface LabelProps {
  content: string;
  subContent?: string;
}

interface StyleProps {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
  flexGap?: number;
  reactive?: boolean;
}

function DefaultLabel({
  content,
  subContent,
  ...rest
}: LabelProps & StyleProps) {
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
};

export default DefaultLabel;

const DefaultLabelAtom = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
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
