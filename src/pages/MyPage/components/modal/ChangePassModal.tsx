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
      width={[500, 300]}
      height={[400, 200]}
      handleToggle={passToggleIsOn}
      close
      isOkBtn
      okBtnTitle="변경"
      isCancelBtn
      cancelBtnTitle="취소"
    />
  );
}

export default ChangePassModal;
