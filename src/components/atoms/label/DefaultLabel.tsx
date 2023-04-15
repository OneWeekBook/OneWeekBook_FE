import styled from 'styled-components';

interface LabelProps {
  content: string;
  subContent?: string;
}

interface StyleProps {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
}

function DefaultLabel({
  content,
  subContent,
  ...rest
}: LabelProps & StyleProps) {
  return (
    <DefaultLabelAtom {...rest}>
      <p>{content}</p>
      <p>{subContent}</p>
    </DefaultLabelAtom>
  );
}

DefaultLabel.defaultProps = {
  fontSize: 1.6,
  fontColor: 'black',
  fontWeight: 500,
};

export default DefaultLabel;

const DefaultLabelAtom = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  background-color: #fff;
  p:first-child {
    color: ${({ fontColor }) => fontColor};
    font-size: ${({ fontSize }) => fontSize}rem;
    font-weight: ${({ fontWeight }) => fontWeight};
  }
  p:last-child {
    color: ${({ fontColor }) => fontColor};
    font-size: ${({ fontSize }) => fontSize && fontSize - 0.2}rem;
    font-weight: ${({ fontWeight }) => fontWeight};
  }
`;
