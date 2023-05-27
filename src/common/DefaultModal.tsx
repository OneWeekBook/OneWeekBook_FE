import React from 'react';
import styled from 'styled-components';
import { DefaultModalTypes } from 'types/page';
import { FUNC_IMAGE } from 'constants/image';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import DefaultText from 'components/atoms/texts/DefaultText';

function Index({
  width,
  height,
  close,
  content,
  contentSize,
  subContent,
  okButtonTitle,
  cancelButtonTitle,
  type,
  handleToggle,
  handleOkClick,
  handleCancelClick,
  children,
}: React.PropsWithChildren<DefaultModalTypes>) {
  return (
    <DefaultModalOuter>
      <DefaultModalContainer width={width} height={height} type={type}>
        <CloseButton>
          {close && (
            <DefaultButton
              className="image"
              width="auto"
              height={25}
              handleClick={handleToggle}
              imageSrc={FUNC_IMAGE.CLOSE}
              imageSize={25}
            />
          )}
        </CloseButton>
        <DefaultModalBody height={height}>
          <DefaultText
            content={content}
            subContent={subContent}
            fontSize={contentSize}
            align="center"
          />
          {children}
          <DefaultButtons>
            {okButtonTitle && (
              <DefaultButton
                handleClick={handleOkClick}
                fontSize={1.8}
                content={okButtonTitle}
              />
            )}
            {cancelButtonTitle && (
              <DefaultButton
                handleClick={handleCancelClick}
                fontSize={1.8}
                content={cancelButtonTitle}
              />
            )}
          </DefaultButtons>
        </DefaultModalBody>
      </DefaultModalContainer>
    </DefaultModalOuter>
  );
}

export default Index;

const DefaultModalOuter = styled.div`
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

const DefaultModalContainer = styled.div<{
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

const CloseButton = styled.div`
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: flex-end;
`;

const DefaultModalBody = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: ${({ height }) => height - 85}px;
`;

const DefaultButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
