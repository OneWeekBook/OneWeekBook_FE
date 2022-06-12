import styled from 'styled-components';

type PropsType = {
  type: string;
};
function NoneItem({ type }: PropsType) {
  return (
    <NoneItemWrapper>
      <Wrapper>
        <img
          src={`${process.env.PUBLIC_URL}/assets/func/search.svg`}
          alt="search icon"
          width={100}
          height={100}
        />
        <div className="info">
          {type === 'init' ? (
            <>
              <p>원하는 검색어를 입력하세요</p>
              <p>
                카테고리를 선택하지 않아도 통합 검색으로만 검색이 가능합니다.
              </p>
            </>
          ) : (
            <p>검색 결과가 존재하지 않습니다.</p>
          )}
        </div>
      </Wrapper>
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
  background-color: #e6e6e6;
  border-radius: 10px;
  margin: 20px 0;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    margin: 5px 0;
  }
`;
