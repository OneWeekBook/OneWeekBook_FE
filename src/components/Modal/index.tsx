import React from 'react';
import styled from 'styled-components';

type PropsType = {
  width: number[];
  height: number[];
  close: boolean;
  title: string;
  titleSize: number;
  isOkBtn: boolean;
  okBtnTitle: string;
  isCancelBtn: boolean;
  cancelBtnTitle: string;
  handleToggle: () => void;
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
  handleToggle,
  children,
}: React.PropsWithChildren<PropsType>) {
  return (
    <BodyWrapper>
      <ModalWrapper width={width} height={height}>
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
        <ModalHeaderWrapper titleSize={titleSize}>
          {title && <p>{title}</p>}
        </ModalHeaderWrapper>
        <ModalBodyWrapper>{children}</ModalBodyWrapper>
        <ButtonWrapper>
          {isOkBtn && <button type="button">{okBtnTitle}</button>}
          {isCancelBtn && <button type="button">{cancelBtnTitle}</button>}
        </ButtonWrapper>
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

const ModalWrapper = styled.div<{ width: number[]; height: number[] }>`
  background-color: white;
  box-sizing: border-box;
  width: ${({ width }) => width[0]}px;
  height: ${({ height }) => height[0]}px;
  padding: 30px 30px;
  z-index: 1100;
  margin: 0 auto;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: ${({ width }) => width[1]}px;
    height: ${({ height }) => height[1]}px;
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

const ModalBodyWrapper = styled.div`
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalHeaderWrapper = styled.div<{ titleSize: number }>`
  width: 100%;
  text-align: center;
  p {
    font-size: ${({ titleSize }) => titleSize}px;
    font-weight: 700;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
