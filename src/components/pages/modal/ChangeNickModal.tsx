import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import { ChangeNickModalType } from 'types/page';
import { ChangeNickInit, ChangeNickRequest } from 'redux/reducers/ChangeNick';
import { userToggle } from 'redux/reducers/Func';
import { showToast } from 'common/Toast';
import useInput from 'hooks/useInput';
import ChangeModal from 'common/DefaultModal';
import InputForm from 'components/modules/forms/InputForm';

function ChangeNickModal({ handleNickToggle }: ChangeNickModalType) {
  const dispatch = useDispatch();
  const [nick, changeNick] = useInput('');
  const { changeErrorStatus } = useSelector(
    (state: AppStateType) => state.changeNick,
  );

  const handleChangeClick = () => {
    dispatch(ChangeNickRequest({ nick }));
  };

  const handleChangeNick = useCallback(() => {
    if (changeErrorStatus === 200) {
      dispatch(userToggle());
      showToast('success', '닉네임 변경 성공!');
      handleNickToggle();
    }
  }, [changeErrorStatus]);

  useEffect(() => {
    handleChangeNick();
    return () => {
      dispatch(ChangeNickInit());
    };
  }, [changeErrorStatus]);

  return (
    <ChangeModal
      content="닉네임 변경"
      contentSize={2.4}
      width={500}
      height={250}
      handleToggle={handleNickToggle}
      close
      okButtonTitle="변경"
      cancelButtonTitle="취소"
      handleOkClick={handleChangeClick}
      handleCancelClick={handleNickToggle}
    >
      <InputForm
        label="닉네임"
        placeholder="변경할 닉네임을 입력해주세요."
        value={nick}
        handleChange={changeNick}
      />
    </ChangeModal>
  );
}

export default ChangeNickModal;
