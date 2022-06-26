import styled from 'styled-components';
import DefaultButton from 'components/Button/DefaultButton';

type PropsType = {
  removeToggleIsOn: () => void;
};

function OutButton({ removeToggleIsOn }: PropsType) {
  return (
    <Wrapper>
      <DefaultButton
        pc={[80, 20]}
        onClick={removeToggleIsOn}
        isHover
        hoverColor="#1e90ff"
        fontSize={[16, 16]}
        fontWeight={600}
        title="회원 탈퇴"
      />
    </Wrapper>
  );
}

export default OutButton;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
