import styled from 'styled-components';
import DefaultButton from 'components/Button/DefaultButton';

type PropsTypes = {
  id: number;
  progress: number;
  handleToggle: () => void;
  handleReviewToggle: () => void;
  onClick: (id: number) => void;
  handleParagraphInfo: () => void;
  handleReviewInfo: () => void;
};
function ButtonWrapper({
  id,
  progress,
  onClick,
  handleToggle,
  handleReviewToggle,
  handleParagraphInfo,
  handleReviewInfo,
}: PropsTypes) {
  return (
    <Wrapper>
      {progress === 0 && (
        <DefaultButton
          pc={[0, 30]}
          onClick={(e) => {
            e.preventDefault();
            handleToggle();
            onClick(id);
          }}
          isHover
          hoverBgColor="#1e90ff"
          hoverColor="white"
          color="#1e90ff"
          fontSize={[14, 14]}
          fontWeight={700}
          padding={[3, 0, 3, 0]}
          title="시작하기"
        />
      )}
      {(progress === 1 || progress === 2) && (
        <DefaultButton
          pc={[0, 30]}
          onClick={(e) => {
            e.preventDefault();
            handleToggle();
            onClick(id);
            handleParagraphInfo();
          }}
          isHover
          hoverBgColor="#1e90ff"
          hoverColor="white"
          color="#1e90ff"
          fontSize={[14, 14]}
          fontWeight={700}
          padding={[3, 0, 3, 0]}
          title="기록하기"
        />
      )}
      {progress === 2 && (
        <DefaultButton
          pc={[0, 30]}
          onClick={(e) => {
            e.preventDefault();
            handleReviewToggle();
            onClick(id);
            handleReviewInfo();
          }}
          isHover
          hoverBgColor="#1e90ff"
          hoverColor="white"
          color="#1e90ff"
          fontSize={[14, 14]}
          fontWeight={700}
          padding={[3, 0, 3, 0]}
          title="리뷰하기"
        />
      )}
    </Wrapper>
  );
}

export default ButtonWrapper;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  button {
    :nth-child(2) {
      margin-left: 10px;
    }
    border: 2px solid #1e90ff;
  }
`;
