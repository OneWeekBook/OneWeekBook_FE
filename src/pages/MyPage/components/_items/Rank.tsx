import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import ProgressBarForm from 'components/Form/ProgressBarForm';

type PropsType = {
  role: number;
};

function Rank({ role }: PropsType) {
  const [rank, setRank] = useState<string>('');

  useLayoutEffect(() => {
    if (role === 3) {
      setRank('독서 천재');
    } else if (role === 2) {
      setRank('독서 중급자');
    } else if (role === 1) {
      setRank('독서 입문자');
    }
  }, [role]);

  return (
    <Wrapper>
      <RankWrapper>
        <ImgWrapper>
          <img
            src={`${process.env.PUBLIC_URL}/assets/main-bestlist-book.png`}
            alt="rank"
          />
        </ImgWrapper>
        <p>등급: {rank}</p>
      </RankWrapper>
      <InfoWrapper>
        <p>다음 등급 까지</p>
        <ProgressBarForm width={200} percent={0.2} />
        <p>10권</p>
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
  display: flex;
  p {
    font-size: 20px;
    font-weight: 600;
    :first-child {
      margin-right: 10px;
    }
    :last-child {
      margin-left: 10px;
    }
  }
  @media (max-width: 425px) {
    p:first-child {
      margin-right: 0;
    }
  }
`;
