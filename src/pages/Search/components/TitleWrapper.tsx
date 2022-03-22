import React from 'react';
import styled from 'styled-components';

type PropsType = {
  tags: string[];
};

function TitleWrapper({ tags }: PropsType) {
  return (
    <Wrapper>
      <ResultPageTitle>전체 검색 결과</ResultPageTitle>
      {tags.map((item, index) => (
        <Tag key={index}>{item}</Tag>
      ))}
    </Wrapper>
  );
}

export default TitleWrapper;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const ResultPageTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const Tag = styled.p`
  background-color: #0080ff;
  border-radius: 10px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  padding: 5px 10px;
  margin-left: 10px;
`;
