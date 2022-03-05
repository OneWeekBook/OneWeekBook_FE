import React from 'react';
import styled from 'styled-components';
import { BestItemTypes } from 'types/main';
import BestItem from './BestItem';

const BestListItems = [
  {
    id: 1,
    title: '거인의 포트폴리오',
    auth: '강환국',
    review: 41,
    recommend: 120,
  },
  {
    id: 2,
    title: '듄 시리즈',
    auth: '프랭크 허버트',
    review: 46,
    recommend: 109,
  },
  {
    id: 3,
    title: '해리포터 시리즈',
    auth: '조앤.K.롤링',
    review: 40,
    recommend: 102,
  },
  {
    id: 4,
    title: '프로젝트 헤일메리',
    auth: '앤디 위어',
    review: 33,
    recommend: 80,
  },
  { id: 5, title: '웰씽킹', auth: '켈리 최', review: 23, recommend: 73 },
  { id: 6, title: '지구 끝의 온실', auth: '김초엽', review: 25, recommend: 64 },
  {
    id: 7,
    title: '달러구트 꿈의 백화점',
    auth: '이미예',
    review: 19,
    recommend: 55,
  },
  { id: 8, title: '그냥 하지 말라', auth: '송길영', review: 14, recommend: 48 },
  { id: 9, title: '토지', auth: '박경리', review: 12, recommend: 28 },
];

function Index() {
  return (
    <Wrapper>
      <BestListTitle>사람들의 관심을 한 몸에 받은 책</BestListTitle>
      <BestListGrid>
        {BestListItems.map((item: BestItemTypes) => (
          <BestItem key={item.id} {...item} />
        ))}
      </BestListGrid>
    </Wrapper>
  );
}

export default Index;

const Wrapper = styled.div`
  margin: 50px auto;
  width: 100%;
  height: auto;
`;

const BestListTitle = styled.p`
  font-size: 25px;
  margin-bottom: 32px;
`;

const BestListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
`;
