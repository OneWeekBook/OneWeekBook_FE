import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import {
  ParagraphDeleteRequest,
  ParagraphInit,
} from 'redux/reducers/Paragraph';
import { SetStartDate } from 'lib/SetDate';
import { InfoTypes } from 'types/book';
import WriteModal from 'components/Modal';
import DefaultButton from 'components/Button/DefaultButton';
import InputWrapper from './InputWrapper';
import ListWrapper from './ListWrapper';

export type CommentModalTypes = {
  bookId: number;
  bookData: InfoTypes;
  toggleIsOn: () => void;
  moveDoneClick?: () => void;
};

function Index({
  bookId,
  bookData,
  toggleIsOn,
  moveDoneClick,
}: CommentModalTypes) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(ParagraphInit());
    };
  }, []);

  const deleteParagraphClick = useCallback((id: number) => {
    dispatch(ParagraphDeleteRequest({ id }));
  }, []);

  return (
    <WriteModal
      type="write"
      title="기록하기"
      titleSize={[24, 18]}
      width={700}
      height={300}
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
            <p>{bookData.title.replaceAll('<b>', '').replaceAll('</b>', '')}</p>
            <p className="bookDate">
              {`${bookData.author
                .replaceAll('<b>', '')
                .replaceAll('</b>', '')} | ${SetStartDate(
                bookData.startTime,
              )} ~ ${
                bookData.progress === 2
                  ? SetStartDate(bookData.endTime)
                  : '독서중'
              }`}
            </p>
          </div>
          {bookData.progress === 1 && (
            <DefaultButton
              pc={[90, 45]}
              onClick={moveDoneClick}
              isHover
              color="#fff"
              bgColor="#a25b5b"
              hoverBgColor="#303538"
              hoverColor="white"
              fontSize={[16, 14]}
              fontWeight={700}
              padding={[3, 0, 3, 0]}
              title="독서완료"
            />
          )}
        </InfoWrapper>
        <InputWrapper bookId={bookId} />
        <ListWrapper
          bookId={bookId}
          deleteParagraphClick={deleteParagraphClick}
        />
      </BodyWrapper>
    </WriteModal>
  );
}

export default Index;

const BodyWrapper = styled.div`
  margin: 10px 40px 0;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    margin: 10px auto 0;
  }
`;

const InfoWrapper = styled.div`
  box-sizing: border-box;
  border-bottom: 2px solid #070707;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 15px;
  .bookInfo {
    font-size: 16px;
    font-weight: 700;
    margin-right: 5px;
  }
  .bookDate {
    font-size: 16px;
    color: #f07055;
  }
  button {
    flex-shrink: 0;
  }
`;
