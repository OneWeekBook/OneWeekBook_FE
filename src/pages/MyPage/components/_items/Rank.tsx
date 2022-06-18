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
    <Wrapper>
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
    </Wrapper>
  );
}

export default Rank;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  @media (max-width: 670px) {
    display: block;
  }
`;

const InfoWrapper = styled.div`
  .rankDesc {
    margin: 10px 0px;
    font-size: 18px;
  }
`;

const RankTitle = styled.p`
  margin: 10px 0px;
  font-size: 22px;
`;
