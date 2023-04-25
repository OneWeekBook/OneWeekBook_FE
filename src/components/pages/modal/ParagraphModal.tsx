import { useEffect, useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { ParagraphModalTypes } from 'types/page';
import { ParagraphTypes } from 'types/book';
import { AppStateType } from 'redux/reducers';
import {
  ParagraphDeleteRequest,
  ParagraphInit,
  ParagraphRequest,
} from 'redux/reducers/Paragraph';
import { SetStartDate } from 'utils/SetDate';
import WriteModal from 'common/DefaultModal';
import DefaultText from 'components/atoms/texts/DefaultText';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import ParagraphCard from 'components/modules/cards/ParagraphCard';
import ParagraphInputForm from 'components/modules/forms/ParagraphInputForm';

function Index({ bookData, toggleIsOn, moveDoneClick }: ParagraphModalTypes) {
  const dispatch = useDispatch();
  const { paragraph, isAddSuccess, isDeleteSuccess } = useSelector(
    (state: AppStateType) => state.paragraph,
    shallowEqual,
  );

  useEffect(() => {
    if (isAddSuccess || isDeleteSuccess) {
      dispatch(ParagraphRequest({ bookId: bookData.id }));
    }
  }, [isAddSuccess, isDeleteSuccess]);

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
      content="기록하기"
      contentSize={2.4}
      width={700}
      height={300}
      handleToggle={toggleIsOn}
      close
      cancelButtonTitle="나중에"
      handleCanCelClick={toggleIsOn}
    >
      <ParagraphModalBody>
        <DefaultText
          className="booktitle"
          content={bookData.title.replaceAll('<b>', '').replaceAll('</b>', '')}
          fontSize={2}
          fontWeight={700}
          reactive
        />
        <BookInfoContainer>
          <BookInfo>
            <DefaultText
              className="bookauth"
              content={bookData.author
                .replaceAll('<b>', '')
                .replaceAll('</b>', '')}
              fontColor={theme.color.COLOR_CORAL}
              reactive
            />
            <DefaultText
              content={`${SetStartDate(bookData.startTime)} ~ ${
                bookData.progress === 2
                  ? SetStartDate(bookData.endTime)
                  : '독서중'
              }`}
              fontSize={1.4}
            />
          </BookInfo>
          {bookData.progress === 1 && (
            <DefaultButton
              handleClick={moveDoneClick}
              fontSize={1.6}
              content="독서완료"
              width={90}
            />
          )}
        </BookInfoContainer>
        <ParagraphInputForm bookId={bookData.id} />
        <ParagraphListContainer>
          {paragraph.map((item: ParagraphTypes) => (
            <ParagraphCard
              key={item.id}
              id={item.id}
              paragraph={item.paragraph}
              deleteParagraphClick={deleteParagraphClick}
            />
          ))}
        </ParagraphListContainer>
      </ParagraphModalBody>
    </WriteModal>
  );
}

export default Index;

const ParagraphModalBody = styled.div`
  margin: 10px 40px 0px;
  .booktitle {
    line-height: 21px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bookauth {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    margin: 10px 20px 0px;
  }
`;

const BookInfoContainer = styled.div`
  box-sizing: border-box;
  border-bottom: 2px solid ${({ theme }) => theme.color.COLOR_GRAY};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 5px;
  margin: 5px auto 10px;
`;

const BookInfo = styled.div`
  width: 100%;
`;

const ParagraphListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 10px auto 20px;
`;
