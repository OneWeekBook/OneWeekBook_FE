import styled from 'styled-components';

interface LabelProps {
  before?: string;
  data: string;
  after?: string;
}

interface StyleProps {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
}

function DataLabel({ before, data, after, ...rest }: LabelProps & StyleProps) {
  return (
    <DataLabelAtom {...rest}>
      {before}
      <span>{data}</span>
      {after}
    </DataLabelAtom>
  );
}

DataLabel.defaultProps = {
  fontSize: 1.6,
  fontColor: 'black',
  fontWeight: 500,
};

export default DataLabel;

const DataLabelAtom = styled.p<StyleProps>`
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
`;
