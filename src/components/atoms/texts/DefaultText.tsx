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
  padding?: number;
}

function DefaultText({
  content,
  subContent,
  ...rest
}: LabelProps & StyleProps) {
  return (
    <DefaultTextAtom {...rest}>
      {content}
      <br />
      {subContent}
    </DefaultTextAtom>
  );
}

DefaultText.defaultProps = {
  fontSize: 1.6,
  fontColor: theme.color.COLOR_BLACK,
  fontWeight: 500,
};

export default DefaultText;

const DefaultTextAtom = styled.p<StyleProps>`
  padding: ${({ padding }) => padding}px;
  color: ${({ fontColor }) => fontColor};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize}rem;
  text-align: left;
`;
