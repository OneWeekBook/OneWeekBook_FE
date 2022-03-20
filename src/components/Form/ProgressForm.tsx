import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import styled from 'styled-components';

type PropsType = {
  rate: number;
};

function ProgressForm({ rate }: PropsType) {
  return (
    <ProgressWrapper>
      <p className="title">전체 평점</p>
      <CircleWrapper>
        <PieChart
          data={[{ value: 20, color: 'black', name: 'name1' }]}
          reveal={20}
          lineWidth={20}
          background="white"
          lengthAngle={360}
          rounded
          animate
          label={({ dataEntry }) => `${dataEntry.value}%`}
          labelStyle={{ fontSize: '26px', fill: '#333' }}
          labelPosition={0}
        />
      </CircleWrapper>
    </ProgressWrapper>
  );
}

export default ProgressForm;

const ProgressWrapper = styled.div`
  margin: 0 30px;
  .title {
    text-align: center;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 600;
  }
`;

const CircleWrapper = styled.div`
  width: 100px;
  hegiht: 100px;
`;
