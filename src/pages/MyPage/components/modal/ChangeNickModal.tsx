import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import { ChangeNickInit, ChangeNickRequest } from 'redux/reducers/ChangeNick';
import { userToggle } from 'redux/reducers/Func';
import { Toast } from 'lib/Toast';
import ChangeModal from 'common/DefaultModal';
import useInput from 'hooks/useInput';
import DefaultInput from 'components/Input/DefaultInput';

type PropsType = {
  nickToggleIsOn: () => void;
};

function ChangeNickModal({ nickToggleIsOn }: PropsType) {
  const dispatch = useDispatch();
  const [nick, changeNick] = useInput('');
  const changeErrorStatus = useSelector(
    (state: AppStateType) => state.changeNick.changeErrorStatus,
  );

  const handleChangeClick = () => {
    dispatch(ChangeNickRequest({ nick }));
  };

  const handleChangeNick = useCallback(() => {
    if (changeErrorStatus === 200) {
      dispatch(userToggle());
      Toast('success', '닉네임 변경 성공!');
      nickToggleIsOn();
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
      handleToggle={nickToggleIsOn}
      close
      okButtonTitle="변경"
      cancelButtonTitle="취소"
      handleOkClick={handleChangeClick}
      handleCanCelClick={nickToggleIsOn}
    >
      <DefaultInput
        type="text"
        title="닉네임"
        placeholder="변경할 닉네임 입력해주세요."
        value={nick}
        onChange={changeNick}
      />
    </ChangeModal>
  );
}

export default ChangeNickModal;
