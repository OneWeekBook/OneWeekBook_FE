import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import styled from 'styled-components';
import theme from 'styles/theme';
import { ChangePassModalType } from 'types/page';
import {
  changePasswordInit,
  changePasswordRequest,
} from 'redux/reducers/changePasswordReducer';
import useInput from 'hooks/useInput';
import { passwordRegex } from 'constants/regex';
import { showToast } from 'common/Toast';
import ChangeModal from 'common/DefaultModal';
import DefaultText from 'components/atoms/texts/DefaultText';
import InputForm from 'components/modules/forms/InputForm';

function ChangePassModal({ handlePassToggle }: ChangePassModalType) {
  const dispatch = useDispatch();
  const [password, changePasswod] = useInput('');
  const [confirmPassword, changeConfirmPasswod] = useInput('');
  const [passError, setPassError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { changeErrorStatus } = useSelector(
    (state: AppStateType) => state.changePassword,
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
    dispatch(changePasswordRequest({ password }));
  };

  useEffect(() => {
    if (changeErrorStatus !== null && changeErrorStatus !== 200)
      setError('오류 관리자에게 문의해주세요.');
    else if (changeErrorStatus === 200) {
      dispatch(changePasswordInit());
      showToast('success', '비밀번호 변경 성공!');
      handlePassToggle();
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
      handleToggle={handlePassToggle}
      close
      okButtonTitle="변경"
      cancelButtonTitle="취소"
      handleOkClick={handleChangePassword}
      handleCancelClick={handlePassToggle}
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
      {passError && (
        <DefaultText
          content={error}
          align="center"
          fontSize={1.2}
          fontColor={theme.color.COLOR_RED}
        />
      )}
    </ChangeModal>
  );
}

export default ChangePassModal;

const PasswordInputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
