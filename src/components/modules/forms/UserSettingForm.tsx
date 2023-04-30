import styled from 'styled-components';
import { UserSettingFormType } from 'types/module';
import useToggle from 'hooks/useToggle';
import DataText from 'components/atoms/texts/DataText';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import ChangePassModal from 'components/pages/modal/ChangePassModal';
import ChangeNickModal from 'components/pages/modal/ChangeNickModal';

function UserSettingForm({ nickName }: UserSettingFormType) {
  const [nickToggle, handleNickToggle] = useToggle(false);
  const [passToggle, handlePassToggle] = useToggle(false);
  return (
    <UserSettingFormModule>
      <DataText before="닉네임:" data={nickName} fontSize={2} />
      <SettingButtons>
        <DefaultButton
          content="닉네임 변경"
          fontSize={1.4}
          fontWeight={300}
          handleClick={handleNickToggle}
          width={90}
          height={35}
        />
        <DefaultButton
          content="비밀번호 변경"
          fontSize={1.4}
          fontWeight={300}
          handleClick={handlePassToggle}
          width={90}
          height={35}
        />
      </SettingButtons>
      {nickToggle && <ChangeNickModal nickToggleIsOn={handleNickToggle} />}
      {passToggle && <ChangePassModal passToggleIsOn={handlePassToggle} />}
    </UserSettingFormModule>
  );
}

export default UserSettingForm;

const UserSettingFormModule = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 425px) {
    display: block;
  }
`;

const SettingButtons = styled.div`
  display: flex;
  gap: 5px;
`;
