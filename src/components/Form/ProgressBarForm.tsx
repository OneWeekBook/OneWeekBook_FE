import React, { useEffect } from 'react';
import styled from 'styled-components';

type PropsType = {
  width: number;
  percent: number;
};

function ProgressBarForm({ width, percent }: PropsType) {
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    setValue(percent * width);
  }, []);

  return (
    <Wrapper width={width}>
      <ProgressWrapper value={value} />
    </Wrapper>
  );
}

export default ProgressBarForm;

const Wrapper = styled.div<{ width: number }>`
  background-color: #e6e6e6;
  border-radius: 5px;
  width: ${({ width }) => width}px;
  height: 30px;
`;

const ProgressWrapper = styled.div<{ value: number }>`
  background-color: #1e90ff;
  border-radius: 5px;
  width: ${({ value }) => value}px;
  height: 30px;
  transition: 1s ease;
  transition-delay: 0.5s;
`;
