import React from 'react';
import styled from 'styled-components';

type PropsType = {
  width: number;
  height: number;
  close: boolean;
  title: string;
  titleSize: number[];
  isOkBtn: boolean;
  okBtnTitle?: string;
  isCancelBtn: boolean;
  cancelBtnTitle?: string;
  type?: string;
  handleToggle: () => void;
  handleOkClick?: () => void;
  handleCanCelClick?: () => void;
};

function Index({
  width,
  height,
  close,
  title,
  titleSize,
  isOkBtn,
  okBtnTitle,
  isCancelBtn,
  cancelBtnTitle,
  type,
  handleToggle,
  handleOkClick,
  handleCanCelClick,
  children,
}: React.PropsWithChildren<PropsType>) {
  return (
    <BodyWrapper>
      <ModalWrapper width={width} height={height} type={type}>
        <CloseButtonWrapper>
          {close && (
            <button onClick={handleToggle} type="button">
              <img
                src={`${process.env.PUBLIC_URL}/assets/modal-close-icon.svg`}
                width={25}
                height={25}
                alt="close"
              />
            </button>
          )}
        </CloseButtonWrapper>
        <ModalBodyWrapper height={height}>
          <ModalTitleWrapper titleSize={titleSize}>
            {title && <p>{title}</p>}
          </ModalTitleWrapper>
          <div>{children}</div>
          <ButtonWrapper>
            {isOkBtn && (
              <button onClick={handleOkClick} type="button">
                {okBtnTitle}
              </button>
            )}
            {isCancelBtn && (
              <button onClick={handleCanCelClick} type="button">
                {cancelBtnTitle}
              </button>
            )}
          </ButtonWrapper>
        </ModalBodyWrapper>
      </ModalWrapper>
    </BodyWrapper>
  );
}

export default Index;

const BodyWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ModalWrapper = styled.div<{
  width: number;
  height: number;
  type?: string;
}>`
  background-color: white;
  box-sizing: border-box;
  width: ${({ width }) => width}px;
  min-height: ${({ height }) => height}px;
  padding: 30px 30px;
  z-index: 1100;
  margin: 0 auto;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: ${({ type }) => (type === 'write' ? 100 : 90)}%;
    height: auto;
    padding: 20px 20px;
  }
`;

const CloseButtonWrapper = styled.div`
  width: 100%;
  height: 25px;
  text-align: right;
  button {
    background-color: white;
    background-repeat: no-repeat;
    background-size: 25px 25px;
    border: 0 none;
    width: 25px;
    height: 25px;
  }
`;

const ModalTitleWrapper = styled.div<{ titleSize: number[] }>`
  width: 100%;
  text-align: center;
  p {
    font-size: ${({ titleSize }) => titleSize[0]}px;
    font-weight: 700;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    p {
      font-size: ${({ titleSize }) => titleSize[1]}px;
      font-weight: 700;
    }
  }
`;

const ModalBodyWrapper = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: ${({ height }) => height - 85}px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  button {
    font-size: 18px;
    font-weight: 600;
    border-radius: 5px;
    border: none;
    width: 100px;
    height: 40px;
    margin: 5px;
  }
`;
