import { PieChart } from 'react-minimal-pie-chart';
import styled from 'styled-components';

type PropsType = {
  title: string;
  rate: number;
};

function ProgressForm({ title, rate }: PropsType) {
  return (
    <ProgressWrapper>
      <p className="title">{title}</p>
      <CircleWrapper>
        <PieChart
          data={[{ value: rate, color: 'black', name: 'name1' }]}
          reveal={rate * 10}
          lineWidth={30}
          background="white"
          lengthAngle={360}
          rounded
          animate
          label={({ dataEntry }) => `${dataEntry.value}`}
          labelStyle={{ fontSize: '26px', fill: '#333', fontWeight: '600' }}
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
