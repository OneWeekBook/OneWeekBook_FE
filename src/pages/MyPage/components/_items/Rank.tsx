import styled from 'styled-components';
import ProgressBarForm from 'components/Form/ProgressBarForm';
import { useEffect } from 'react';

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
      <RankWrapper>
        <ImgWrapper>
          <img
            src={`${process.env.PUBLIC_URL}/assets/func/book.png`}
            alt="rank"
          />
        </ImgWrapper>
        <p>등급: {rank}</p>
      </RankWrapper>
      <InfoWrapper>
        <ProgressBarForm
          limit={limit}
          write={write}
          width={200}
          percent={percent}
        />
        <p>다음 등급까지 {remaining}권 남았습니다.</p>
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

const RankWrapper = styled.div`
  p {
    font-size: 18px;
    font-weight: 600;
  }
`;

const ImgWrapper = styled.div`
  width: 150px;
  height: 100px;
  margin-right: 30px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const InfoWrapper = styled.div`
  p {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 600;
  }
`;
