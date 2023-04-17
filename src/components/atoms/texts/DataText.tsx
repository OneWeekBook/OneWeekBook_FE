import styled from 'styled-components';
import theme from 'styles/theme';
import { DataTextTypes, TextStyleTypes } from 'types/atom';

function DataText({
  before,
  data,
  after,
  ...rest
}: DataTextTypes & TextStyleTypes) {
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

const DataTextAtom = styled.p<TextStyleTypes>`
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
`;
