import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import {
  ChangePasswordInit,
  ChangePasswordRequest,
} from 'redux/reducers/ChangePassword';
import useInput from 'hooks/useInput';
import { passwordRegex } from 'lib/Regex';
import { Toast } from 'lib/Toast';
import ChangeModal from 'components/Modal';
import ErrorForm from 'components/Form/ErrorForm';
import DefaultInput from 'components/Input/DefaultInput';

type PropsType = {
  passToggleIsOn: () => void;
};

function ChangePassModal({ passToggleIsOn }: PropsType) {
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
    dispatch(ChangePasswordRequest({ password }));
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
      height={300}
      handleToggle={passToggleIsOn}
      close
      isOkBtn
      okBtnTitle="변경"
      handleOkClick={handleChangePassword}
      isCancelBtn
      handleCanCelClick={passToggleIsOn}
      cancelBtnTitle="취소"
    >
      <DefaultInput
        type="password"
        title="변경할 비밀번호 입력"
        placeholder="변경할 비밀번호를 입력해주세요."
        value={password}
        onChange={changePasswod}
      />
      <DefaultInput
        type="password"
        title="변경할 비밀번호 확인"
        placeholder="한번더 비밀번호를 입력해주세요."
        value={confirmPassword}
        onChange={changeConfirmPasswod}
      />
      {passError && <ErrorForm error={error} align="center" />}
    </ChangeModal>
  );
}

export default ChangePassModal;
