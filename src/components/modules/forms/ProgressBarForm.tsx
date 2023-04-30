import { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { ProgressBarTypes } from 'types/module';
import DefaultText from 'components/atoms/texts/DefaultText';

function ProgressBarForm({ limit, write, width, percent }: ProgressBarTypes) {
  const [value, setValue] = useState(0);

  useLayoutEffect(() => {
    setValue(percent * width);
  }, [percent]);

  return (
    <ProgressBarFormModule>
      <ProgressBar width={width}>
        {percent && <Progress value={value}>{write}</Progress>}
      </ProgressBar>
      <DefaultText content={limit} fontSize={1.8} />
    </ProgressBarFormModule>
  );
}

export default ProgressBarForm;

const ProgressBarFormModule = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 10px auto 5px;
`;

const ProgressBar = styled.div<{ width: number }>`
  border: 2px solid ${({ theme }) => theme.color.COLOR_CORAL};
  background-color: ${({ theme }) => theme.color.COLOR_LEMON_CHIFFON};
  border-radius: 5px;
  width: ${({ width }) => width}px;
  height: 30px;
`;

const Progress = styled.div<{ value: number }>`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.COLOR_CORAL};
  border-radius: 0px 5px 5px 0px;
  color: ${({ theme }) => theme.color.COLOR_WHITE};
  width: ${({ value }) => value}px;
  height: 30px;
  line-height: 30px;
  padding-right: 5px;
  text-align: right;
  transition: 1s ease;
  transition-delay: 0.5s;
  font-size: 1.8rem;
`;
