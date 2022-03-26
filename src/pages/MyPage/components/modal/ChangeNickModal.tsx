import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import ChangeModal from 'components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeNickRequest } from 'redux/reducers/ChangeNick';
import { useInput } from 'hooks/useInput';
import { userToggle } from 'redux/reducers/FuncToggle';

type PropsType = {
  nickToggleIsOn: () => void;
};

function ChangeNickModal({ nickToggleIsOn }: PropsType) {
  const dispatch = useDispatch();
  const [nick, changeNick] = useInput('');
  const { user } = useSelector((state: any) => state.authUser);
  const { changeErrorStatus } = useSelector((state: any) => state.changeNick);

  const handleChangeClick = () => {
    dispatch(ChangeNickRequest({ nick, id: user.id }));
  };

  const handleChangeNick = useCallback(() => {
    if (changeErrorStatus === 200) {
      dispatch(userToggle());
      nickToggleIsOn();
    }
  }, [changeErrorStatus]);

  useEffect(() => {
    handleChangeNick();
  }, [changeErrorStatus]);

  return (
    <ChangeModal
      title="닉네임 변경"
      titleSize={24}
      width={500}
      height={300}
      handleToggle={nickToggleIsOn}
      close
      isOkBtn
      okBtnTitle="변경"
      handleOkClick={handleChangeClick}
      isCancelBtn
      cancelBtnTitle="취소"
      handleCanCelClick={nickToggleIsOn}
    >
      <InputWrapper>
        <p>닉네임</p>
        <input
          type="text"
          placeholder="변경할 닉네임 입력해주세요."
          defaultValue={nick}
          onBlur={changeNick}
        />
      </InputWrapper>
    </ChangeModal>
  );
}

export default ChangeNickModal;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  margin: 40px auto;
  input {
    box-sizing: border-box;
    padding-left: 10px;
    width: 300px;
    height: 40px;
    margin-left: 10px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    margin: 20px auto;
  }
`;
