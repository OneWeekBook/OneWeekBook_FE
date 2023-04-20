import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { RemoveUserInit, RemoveUserRequest } from 'redux/reducers/RemoveUser';
import useInput from 'hooks/useInput';
import { Toast } from 'lib/Toast';
import ErrorForm from 'components/Form/ErrorForm';
import RemoveModal from 'common/DefaultModal';

type PropsType = {
  removeToggleIsOn: () => void;
};

function RemoveUserModal({ removeToggleIsOn }: PropsType) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      sessionStorage.removeItem('accessToken');
      removeToggleIsOn();
      Toast('info', '회원탈퇴가 정상적으로 처리되었습니다.');
      navigate('/');
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
    <RemoveModal
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
      <Desc>회원탈퇴 하시려면 비밀번호를 입력해주세요.</Desc>
      <InputWrapper>
        <p>비밀번호</p>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          defaultValue={password}
          onBlur={changePassword}
        />
      </InputWrapper>
      {isError && <ErrorForm error={error} align="center" />}
    </RemoveModal>
  );
}

export default RemoveUserModal;

const Desc = styled.p`
  text-align: center;
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  width: 100%;
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
    margin: 20px auto;
    font-size: 14px;
  }
`;
