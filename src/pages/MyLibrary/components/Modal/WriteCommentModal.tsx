import React from 'react';
import WriteModal from 'components/Modal';
import styled from 'styled-components';
import { useInput } from 'hooks/useInput';
import { LibraryItemTypes } from 'types/book';

type PropsType = {
  toggleIsOn: () => void;
};

function WriteCommentModal({
  progress,
  title,
  author,
  startTime,
  toggleIsOn,
}: LibraryItemTypes & PropsType) {
  const [comment, changeComment] = useInput('');
  return (
    <WriteModal
      type="write"
      title="기록하기"
      titleSize={[24, 18]}
      width={768}
      height={400}
      handleToggle={toggleIsOn}
      close
      isOkBtn={false}
      isCancelBtn
      cancelBtnTitle="나중에..."
      handleCanCelClick={toggleIsOn}
    >
      <BodyWrapper>
        <InfoWrapper>
          <div className="bookInfo">
            <p>{title}</p>
            <p>
              {author} {startTime}
            </p>
          </div>
          {progress === 1 && <button type="button">독서 완료</button>}
        </InfoWrapper>
        <InputWrapper>
          <Input>
            <input
              type="text"
              placeholder="기억에 남는 문구를 입력해주세요."
              defaultValue={comment}
              onBlur={changeComment}
            />
            <span />
          </Input>
          <button type="button">추가</button>
        </InputWrapper>
        <div>
          <ContentItem>안녕하세요안녕하세요</ContentItem>
          <ContentItem>안녕하세요안녕하세요</ContentItem>
          <ContentItem>안녕하세요안녕하세요</ContentItem>
          <ContentItem>안녕하세요안녕하세요</ContentItem>
          <ContentItem>안녕하세요안녕하세요</ContentItem>
        </div>
      </BodyWrapper>
    </WriteModal>
  );
}

export default WriteCommentModal;

const BodyWrapper = styled.div`
  margin: 10px 50px 0;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    margin: 10px auto 0;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  button {
    right: 0;
    bottom: 5px;
    position: absolute;
    border: none;
    width: 30px;
    height: 30px;
  }
`;

const InfoWrapper = styled.div`
  box-sizing: border-box;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  .bookInfo {
    font-size: 18px;
    font-weight: 600;
  }
  button {
    border: none;
    border-radius: 10px;
    width: 100px;
    height: 40px;
    font-size: 16px;
    font-weight: 600;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .bookInfo {
      font-size: 16px;
      font-weight: 600;
    }
    button {
      border: none;
      width: 80px;
      height: 35px;
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

const Input = styled.div`
  position: relative;
  width: 100%;
  margin-top: 10px;
  input {
    :focus {
      outline: none;
    }
    box-sizing: border-box;
    padding: 0 5px;
    height: 30px;
    border: none;
    width: 100%;
    border-bottom: solid 1px black;
  }
  input ~ span {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #1e90ff;
    transition: 0.4s;
  }
  input:focus ~ span {
    width: 100%;
    transition: 0.4s;
    left: 0;
  }
  input:disabled {
    background-color: white;
  }
`;

const ContentItem = styled.div`
  box-sizing: border-box;
  border-bottom: 1px solid gray;
  margin: 10px auto;
  padding-bottom: 5px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 14px;
  }
`;
