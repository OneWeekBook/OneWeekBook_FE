import React from 'react';
import ChangeModal from 'components/Modal';

type PropsType = {
  passToggleIsOn: () => void;
};

function ChangePassModal({ passToggleIsOn }: PropsType) {
  return (
    <ChangeModal
      title="비밀번호 변경"
      titleSize={24}
      width={500}
      height={400}
      handleToggle={passToggleIsOn}
      close
      isOkBtn
      okBtnTitle="변경"
      handleOkClick={passToggleIsOn}
      isCancelBtn
      handleCanCelClick={passToggleIsOn}
      cancelBtnTitle="취소"
    />
  );
}

export default ChangePassModal;
