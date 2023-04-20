import styled from 'styled-components';
import useToggle from 'hooks/useToggle';
import DefaultButton from 'components/Button/DefaultButton';
import ChangePassModal from 'components/page/modal/ChangePassModal';
import ChangeNickModal from 'components/page/modal/ChangeNickModal';

interface PropsType {
  nickName: string;
}

function NameButton({ nickName }: PropsType) {
  const [nickToggle, nickToggleIsOn] = useToggle(false);
  const [passToggle, passToggleIsOn] = useToggle(false);
  return (
    <Wrapper>
      <NickName>닉네임: {nickName}</NickName>
      <ButtonWrapper>
        <DefaultButton
          pc={[100, 38]}
          onClick={nickToggleIsOn}
          isHover
          hoverBgColor="#ffa07a"
          hoverColor="white"
          bgColor="#f07055"
          color="white"
          margin={[0, 10, 0, 0]}
          fontSize={[16, 14]}
          fontWeight={600}
          title="닉네임 변경"
        />
        <DefaultButton
          pc={[100, 38]}
          onClick={passToggleIsOn}
          isHover
          hoverBgColor="#ffa07a"
          hoverColor="white"
          bgColor="#f07055"
          color="white"
          fontSize={[16, 14]}
          fontWeight={600}
          title="비밀번호 변경"
        />
      </ButtonWrapper>
      {nickToggle && <ChangeNickModal nickToggleIsOn={nickToggleIsOn} />}
      {passToggle && <ChangePassModal passToggleIsOn={passToggleIsOn} />}
    </Wrapper>
  );
}

export default NameButton;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 425px) {
    display: block;
  }
`;

const NickName = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const ButtonWrapper = styled.div`
  display: flex;
  @media (max-width: 425px) {
    margin-top: 10px;
  }
`;
