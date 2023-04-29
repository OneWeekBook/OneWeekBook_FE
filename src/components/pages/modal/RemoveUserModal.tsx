import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import { RemoveUserModalType } from 'types/page';
import { RemoveUserInit, RemoveUserRequest } from 'redux/reducers/RemoveUser';
import useInput from 'hooks/useInput';
import useRouter from 'hooks/useRouter';
import { removeAccessTokenFromSessionStorage } from 'utils/accessTokenHandler';
import { PATH_URL } from 'constants/path';
import { showToast } from 'common/Toast';
import DefaultModal from 'common/DefaultModal';
import ErrorText from 'components/atoms/texts/ErrorText';
import DefaultText from 'components/atoms/texts/DefaultText';
import InputForm from 'components/modules/forms/InputForm';

function RemoveUserModal({ removeToggleIsOn }: RemoveUserModalType) {
  const dispatch = useDispatch();
  const { routeTo } = useRouter();
  const [error, setError] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [password, changePassword] = useInput('');
  const removeErrorStatus = useSelector(
    (state: AppStateType) => state.removeUser.removeErrorStatus,
  );

  const handleRemoveClick = () => {
    dispatch(RemoveUserRequest({ password }));
  };

  const handleRemoveUser = useCallback(() => {
    if (removeErrorStatus === 200) {
      removeAccessTokenFromSessionStorage();
      removeToggleIsOn();
      showToast('info', '회원탈퇴가 정상적으로 처리되었습니다.');
      routeTo(PATH_URL.MAIN);
    } else if (removeErrorStatus === 400) {
      setIsError(true);
      setError('비밀번호가 올바르지 않습니다.');
    } else if (removeErrorStatus !== null) {
      setIsError(true);
      setError('오류, 관리자에게 문의하세요.');
    }
  }, [removeErrorStatus]);

  useEffect(() => {
    return () => {
      dispatch(RemoveUserInit());
      setIsError(false);
    };
  }, []);

  useEffect(() => {
    handleRemoveUser();
  }, [removeErrorStatus]);

  return (
    <DefaultModal
      content="회원탈퇴"
      contentSize={2.4}
      width={500}
      height={300}
      handleToggle={removeToggleIsOn}
      close
      okButtonTitle="탈퇴"
      cancelButtonTitle="취소"
      handleOkClick={handleRemoveClick}
      handleCanCelClick={removeToggleIsOn}
    >
      <DefaultText
        content="회원탈퇴 하시려면 비밀번호를 입력해주세요."
        align="center"
        fontWeight={300}
        fontSize={1.8}
        reactive
      />
      <InputForm
        type="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해주세요."
        value={password}
        handleChange={changePassword}
      />
      {isError && <ErrorText error={error} align="center" />}
    </DefaultModal>
  );
}

export default RemoveUserModal;
