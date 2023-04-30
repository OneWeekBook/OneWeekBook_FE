import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import styled from 'styled-components';
import { ChangePassModalType } from 'types/page';
import {
  ChangePasswordInit,
  ChangePasswordRequest,
} from 'redux/reducers/ChangePassword';
import useInput from 'hooks/useInput';
import { passwordRegex } from 'utils/Regex';
import { showToast } from 'common/Toast';
import ChangeModal from 'common/DefaultModal';
import ErrorText from 'components/atoms/texts/ErrorText';
import InputForm from 'components/modules/forms/InputForm';

function ChangePassModal({ passToggleIsOn }: ChangePassModalType) {
  const dispatch = useDispatch();
  const [password, changePasswod] = useInput('');
  const [confirmPassword, changeConfirmPasswod] = useInput('');
  const [passError, setPassError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const changeErrorStatus = useSelector(
    (state: AppStateType) => state.changePassword.changeErrorStatus,
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
    dispatch(ChangePasswordRequest({ password }));
  };

  useEffect(() => {
    if (changeErrorStatus !== null && changeErrorStatus !== 200)
      setError('오류 관리자에게 문의해주세요.');
    else if (changeErrorStatus === 200) {
      dispatch(ChangePasswordInit());
      showToast('success', '비밀번호 변경 성공!');
      passToggleIsOn();
    }
    return () => {
      setPassError(false);
    };
  }, [changeErrorStatus]);

  return (
    <ChangeModal
      content="비밀번호 변경"
      contentSize={2.4}
      width={500}
      height={300}
      handleToggle={passToggleIsOn}
      close
      okButtonTitle="변경"
      cancelButtonTitle="취소"
      handleOkClick={handleChangePassword}
      handleCancelClick={passToggleIsOn}
    >
      <PasswordInputs>
        <InputForm
          type="password"
          label="비밀번호 입력"
          placeholder="변경할 비밀번호를 입력해주세요."
          value={password}
          handleChange={changePasswod}
        />
        <InputForm
          type="password"
          label="비밀번호 확인"
          placeholder="한번더 비밀번호를 입력해주세요."
          value={confirmPassword}
          handleChange={changeConfirmPasswod}
        />
      </PasswordInputs>
      {passError && <ErrorText error={error} align="center" />}
    </ChangeModal>
  );
}

export default ChangePassModal;

const PasswordInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
