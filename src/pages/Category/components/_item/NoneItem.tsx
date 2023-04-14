import styled from 'styled-components';

type PropsType = {
  type: string;
};
function NoneItem({ type }: PropsType) {
  return (
    <NoneItemWrapper>
      {type === 'init' ? (
        <div className="info">
          <img
            src={`${process.env.PUBLIC_URL}/assets/func/question_mark.svg`}
            alt="search icon"
            width={100}
            height={100}
          />
          <p>원하는 검색어를 입력하세요</p>
          <p>카테고리를 선택하지 않아도 통합 검색으로만 검색이 가능합니다.</p>
        </div>
      ) : (
        <div className="info">
          <img
            src={`${process.env.PUBLIC_URL}/assets/func/question_mark.svg`}
            alt="search icon"
            width={100}
            height={100}
          />
          <p>검색 결과가 존재하지 않습니다.</p>
        </div>
      )}
    </NoneItemWrapper>
  );
}

export default NoneItem;

const NoneItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.color.COLOR_LAYOUT_TWO};
  border-radius: 10px;
  margin: 20px auto;
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    img {
      margin-bottom: 20px;
    }
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
  }
`;
