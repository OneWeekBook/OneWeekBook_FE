import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  ChangePasswordInit,
  ChangePasswordRequest,
} from 'redux/reducers/ChangePassword';
import { useInput } from 'hooks/useInput';
import { passwordRegex } from 'lib/Regex';
import { Toast } from 'lib/Toast';
import ChangeModal from 'components/Modal';
import ErrorForm from 'components/Form/ErrorForm';

type PropsType = {
  passToggleIsOn: () => void;
};

function ChangePassModal({ passToggleIsOn }: PropsType) {
  const dispatch = useDispatch();
  const [password, changePasswod] = useInput('');
  const [confirmPassword, changeConfirmPasswod] = useInput('');
  const [passError, setPassError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { user } = useSelector((state: any) => state.authUser);
  const { changeErrorStatus } = useSelector(
    (state: any) => state.changePassword,
  );

  const handleChangePassword = () => {
    if (password && !passwordRegex.test(password)) {
      setPassError(true);
      setError('비밀번호 양식이 올바르지 않습니다.');
      return;
    }
    if (password !== confirmPassword) {
      setPassError(true);
      setError('비밀번호가 서로 일치하지 않습니다.');
      return;
    }
    setPassError(false);
    dispatch(ChangePasswordRequest({ email: user.email, password }));
  };

  useEffect(() => {
    if (changeErrorStatus !== null && changeErrorStatus !== 200)
      setError('오류 관리자에게 문의해주세요.');
    else if (changeErrorStatus === 200) {
      dispatch(ChangePasswordInit());
      Toast('success', '비밀번호 변경 성공!');
      passToggleIsOn();
    }
    return () => {
      setPassError(false);
    };
  }, [changeErrorStatus]);

  return (
    <ChangeModal
      title="비밀번호 변경"
      titleSize={[24, 20]}
      width={500}
      height={350}
      handleToggle={passToggleIsOn}
      close
      isOkBtn
      okBtnTitle="변경"
      handleOkClick={handleChangePassword}
      isCancelBtn
      handleCanCelClick={passToggleIsOn}
      cancelBtnTitle="취소"
    >
      <InputWrapper>
        <p>비밀번호 입력</p>
        <input
          type="password"
          placeholder="변경할 비밀번호를 입력해주세요."
          defaultValue={password}
          onBlur={changePasswod}
        />
      </InputWrapper>
      <InputWrapper>
        <p>비밀번호 확인</p>
        <input
          type="password"
          placeholder="변경할 비밀번호를 입력해주세요."
          defaultValue={confirmPassword}
          onBlur={changeConfirmPasswod}
        />
      </InputWrapper>
      {passError && <ErrorForm error={error} align="center" />}
    </ChangeModal>
  );
}

export default ChangePassModal;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  :first-child {
    margin: 0 auto 20px;
  }
  p {
    flex-shrink: 0;
  }
  input {
    box-sizing: border-box;
    padding-left: 10px;
    max-width: 300px;
    width: 100%;
    height: 40px;
    margin-left: 10px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 14px;
    :first-child {
      margin: 10px auto 10px;
    }
    input {
      height: 36px;
    }
  }
`;
