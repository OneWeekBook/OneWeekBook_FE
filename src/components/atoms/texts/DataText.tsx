import styled from 'styled-components';
import theme from 'styles/theme';

interface TextProps {
  before?: string;
  data: string | number;
  after?: string;
}

interface StyleProps {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
}

function DataText({ before, data, after, ...rest }: TextProps & StyleProps) {
  return (
    <DataTextAtom {...rest}>
      {before}
      <span>{data}</span>
      {after}
    </DataTextAtom>
  );
}

DataText.defaultProps = {
  fontSize: 1.6,
  fontColor: theme.color.COLOR_BLACK,
  fontWeight: 500,
};

export default DataText;

const DataTextAtom = styled.p<StyleProps>`
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
`;
