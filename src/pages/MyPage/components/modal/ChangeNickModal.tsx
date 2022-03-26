import React from 'react';
import ChangeModal from 'components/Modal';

type PropsType = {
  nickToggleIsOn: () => void;
};

function ChangeNickModal({ nickToggleIsOn }: PropsType) {
  return (
    <ChangeModal
      title="닉네임 변경"
      titleSize={24}
      width={[500, 300]}
      height={[400, 200]}
      handleToggle={nickToggleIsOn}
      close
      isOkBtn
      okBtnTitle="변경"
      isCancelBtn
      cancelBtnTitle="취소"
    />
  );
}

export default ChangeNickModal;
