import styled from 'styled-components';
import { NoneCardTypes } from 'types/module';
import { FUNC_IMAGE } from 'constants/image';
import DefaultImage from 'components/atoms/images/DefaultImage';
import DefaultText from 'components/atoms/texts/DefaultText';

function NoneBookCard({ type }: NoneCardTypes) {
  return (
    <NoneBookCardModule>
      <DefaultImage
        imageSrc={FUNC_IMAGE.QUESTION_MARK}
        imageAlt="search icon"
        pc={[100, 100]}
      />
      {type === 'init' ? (
        <>
          <DefaultText content="원하는 검색어를 입력하세요!" />
          <DefaultText content="카테고리를 선택하지 않아도 통합 검색으로만 검색이 가능합니다." />
        </>
      ) : (
        <DefaultText content="검색 결과가 존재하지 않습니다." />
      )}
    </NoneBookCardModule>
  );
}

export default NoneBookCard;

const NoneBookCardModule = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 300px;
  background-color: ${({ theme }) => theme.color.COLOR_CORAL};
  border-radius: 10px;
  margin: 20px auto;
  p {
    margin-top: 5px;
    text-align: center;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.color.COLOR_WHITE};
  }
`;
