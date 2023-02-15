import React from 'react';
import styled from 'styled-components';
import DefaultButton from 'components/Button/DefaultButton';
import ImageButton from 'components/Button/ImageButton';

type PropsType = {
  width: number;
  height: number;
  close: boolean;
  title: string;
  titleSize: number[];
  subTitle?: string;
  subTitleSize?: number[];
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
  subTitle,
  subTitleSize,
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
            <ImageButton
              type="button"
              onClick={handleToggle}
              src={`${process.env.PUBLIC_URL}/assets/func/modal-close.svg`}
              alt="close"
              pc={[25, 25]}
              imgPC={[25, 25]}
            />
          )}
        </CloseButtonWrapper>
        <ModalBodyWrapper height={height}>
          <ModalTitleWrapper size={titleSize}>
            {title && <p>{title}</p>}
          </ModalTitleWrapper>
          <ModalTitleWrapper size={subTitleSize}>
            {subTitle && <p>{subTitle}</p>}
          </ModalTitleWrapper>
          <div>{children}</div>
          <ButtonWrapper>
            {isOkBtn && (
              <DefaultButton
                pc={[120, 40]}
                onClick={handleOkClick}
                isHover
                hoverBgColor="#ffa07a"
                hoverColor="white"
                bgColor="#f07055"
                color="white"
                margin={[5, 5, 5, 5]}
                fontSize={[18, 18]}
                fontWeight={600}
                title={okBtnTitle ? `${okBtnTitle}` : ''}
              />
            )}
            {isCancelBtn && (
              <DefaultButton
                pc={[120, 40]}
                onClick={handleCanCelClick}
                isHover
                hoverBgColor="#ffa07a"
                hoverColor="white"
                bgColor="#f07055"
                color="white"
                margin={[5, 5, 5, 5]}
                fontSize={[18, 18]}
                fontWeight={600}
                title={cancelBtnTitle ? `${cancelBtnTitle}` : ''}
              />
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
  border-radius: 10px;
  width: ${({ width }) => width}px;
  min-height: ${({ height }) => height}px;
  padding: 30px 30px;
  z-index: 1100;
  margin: 0 auto;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 95%;
    height: auto;
    padding: 20px 20px;
  }
`;

const CloseButtonWrapper = styled.div`
  width: 100%;
  height: 25px;
  text-align: right;
`;

const ModalTitleWrapper = styled.div<{ size?: number[] }>`
  width: 100%;
  text-align: center;
  p {
    font-size: ${({ size }) => size && size[0]}px;
    font-weight: 700;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    p {
      font-size: ${({ size }) => size && size[1]}px;
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
`;
