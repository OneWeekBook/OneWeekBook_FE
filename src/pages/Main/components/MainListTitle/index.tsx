import React from 'react';
import styled from 'styled-components';

interface PropsType {
  title: string;
  subTitle: string;
}

function Index({ title, subTitle }: PropsType) {
  return (
    <MainListTitleContainer>
      <Bar />
      <TitleWrapper>
        <p>{title}</p>
        <p>{subTitle}</p>
      </TitleWrapper>
      <Bar />
    </MainListTitleContainer>
  );
}

export default Index;

const MainListTitleContainer = styled.div`
  margin-bottom: 50px;
  display: flex;
  align-items: center;
`;

const Bar = styled.div`
  flex-grow: 2;
  height: 2px;
  background-color: #f7b7a9;
`;

const TitleWrapper = styled.div`
  width: 400px;
  text-align: center;
  color: #f07055;
  p:first-child {
    font-size: 36px;
    line-height: 1.5;
  }
  p:last-child {
    font-size: 30px;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 350px;
    p:first-child {
      font-size: 30px;
    }
    p:last-child {
      font-size: 24px;
    }
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 230px;
    p:first-child {
      font-size: 24px;
    }
    p:last-child {
      font-size: 18px;
    }
  }
`;
