import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';

type PropsType = {
  limit: number;
  write: number;
  width: number;
  percent: number;
};

function ProgressBarForm({ limit, write, width, percent }: PropsType) {
  const [value, setValue] = useState(0);

  useLayoutEffect(() => {
    setValue(percent * width);
  }, [percent]);

  return (
    <ProgressWrapper>
      <Wrapper width={width}>
        {percent && <Progress value={value}>{write}</Progress>}
      </Wrapper>
      <Limit>{limit}</Limit>
    </ProgressWrapper>
  );
}

export default ProgressBarForm;

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Wrapper = styled.div<{ width: number }>`
  border: 2px solid #f07055;
  background-color: #e6e6e6;
  border-radius: 5px;
  width: ${({ width }) => width}px;
  height: 30px;
`;

const Progress = styled.div<{ value: number }>`
  background-color: #f07055;
  color: #fff;
  border-radius: 0px 5px 5px 0px;
  width: ${({ value }) => value}px;
  height: 30px;
  line-height: 30px;
  padding-right: 5px;
  text-align: right;
  transition: 1s ease;
  transition-delay: 0.5s;
`;

const Limit = styled.div`
  line-height: 30px;
  font-size: 18px;
  margin-left: 5px;
`;
