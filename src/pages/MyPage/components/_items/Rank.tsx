import styled from 'styled-components';
import ProgressBarForm from 'components/Form/ProgressBarForm';

type PropsType = {
  rank: string;
  limit: number;
  write: number;
  remaining: number;
  percent: number;
};

function Rank({ rank, limit, write, remaining, percent }: PropsType) {
  return (
    <InfoWrapper>
      <RankTitle>등급: {rank}</RankTitle>
      <ProgressBarForm
        limit={limit}
        write={write}
        width={200}
        percent={percent}
      />
      <p className="rankDesc">다음 등급까지 {remaining}권 남았습니다.</p>
    </InfoWrapper>
  );
}

export default Rank;

const InfoWrapper = styled.div`
  margin-top: 20px;
  .rankDesc {
    margin: 10px 0px;
    font-size: 18px;
  }
`;

const RankTitle = styled.p`
  margin: 10px 0px;
  font-size: 20px;
`;
