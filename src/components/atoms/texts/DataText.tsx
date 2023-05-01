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
      <span>&nbsp;{data}</span>
      {after}
    </DataTextAtom>
  );
}

DataText.defaultProps = {
  fontSize: 1.6,
  fontColor: [theme.color.COLOR_BLACK, theme.color.COLOR_BLACK],
  fontWeight: 500,
};

export default DataText;

const DataTextAtom = styled.p<TextStyleTypes>`
  color: ${({ fontColor }) => fontColor && fontColor[0]};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
  span {
    color: ${({ fontColor }) => fontColor && fontColor[1]};
    font-size: ${({ fontSize }) => fontSize}rem;
    font-weight: ${({ fontWeight }) => fontWeight};
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    font-size: ${({ fontSize, reactive }) =>
      reactive && fontSize && fontSize - 0.2}rem;
    span {
      font-size: ${({ fontSize, reactive }) =>
        reactive && fontSize && fontSize - 0.2}rem;
    }
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: ${({ fontSize, reactive }) =>
      reactive && fontSize && fontSize - 0.4}rem;
    span {
      font-size: ${({ fontSize, reactive }) =>
        reactive && fontSize && fontSize - 0.4}rem;
    }
  }
`;
