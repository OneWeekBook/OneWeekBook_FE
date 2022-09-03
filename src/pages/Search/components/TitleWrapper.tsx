import styled from 'styled-components';

type PropsType = {
  tags: Set<string>;
};

function TitleWrapper({ tags }: PropsType) {
  return (
    <Wrapper>
      <ResultPageTitle>전체 검색 결과</ResultPageTitle>
      {Array.from(tags).map((item, index) => (
        <Tag key={index}>{item}</Tag>
      ))}
    </Wrapper>
  );
}

export default TitleWrapper;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 20px auto 0;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
  }
`;

const ResultPageTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.COLOR_FONT_TWO};
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    font-size: 18px;
  }
`;

const Tag = styled.p`
  background-color: ${({ theme }) => theme.color.COLOR_MAIN};
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  padding: 5px 10px;
  margin-left: 10px;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    font-size: 12px;
    margin-left: 5px;
  }
`;
