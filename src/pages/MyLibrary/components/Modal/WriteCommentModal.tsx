import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  ParagraphAddRequest,
  ParagraphDeleteRequest,
  ParagraphInit,
  ParagraphRequest,
} from 'redux/reducers/Paragraph';
import { Toast } from 'lib/Toast';
import { SetStartDate } from 'lib/SetDate';
import { InfoTypes, ParagraphTypes } from 'types/book';
import DefaultButton from 'components/Button/DefaultButton';
import ImageButton from 'components/Button/ImageButton';
import WriteModal from 'components/Modal';
import ParagraphItem from '../_item/ParagraphItem';

type PropsTypes = {
  bookId: number;
  bookData: InfoTypes;
  toggleIsOn: () => void;
  moveDoneClick?: () => void;
};

function WriteCommentModal({
  bookId,
  bookData,
  toggleIsOn,
  moveDoneClick,
}: PropsTypes) {
  const dispatch = useDispatch();
  const [parag, setParag] = useState<string>('');
  const { paragraph, isAddSuccess, isDeleteSuccess } = useSelector(
    (state: any) => state.paragraph,
  );

  const addParagraphClick = () => {
    if (parag) {
      const data = { bookId, paragraph: parag };
      dispatch(ParagraphAddRequest(data));
    } else {
      Toast('warning', '문구를 입력해주세요');
    }
  };

  const deleteParagraphClick = (id: number) => {
    dispatch(ParagraphDeleteRequest({ id }));
  };

  useEffect(() => {
    return () => {
      dispatch(ParagraphInit());
    };
  }, []);

  useEffect(() => {
    if (isAddSuccess || isDeleteSuccess) {
      setParag('');
      dispatch(ParagraphRequest({ bookId }));
    }
  }, [isAddSuccess, isDeleteSuccess]);

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
              pc={[90, 30]}
              onClick={moveDoneClick}
              isHover
              bgColor="lightgray"
              hoverBgColor="#303538"
              hoverColor="white"
              fontSize={[14, 14]}
              fontWeight={700}
              padding={[3, 0, 3, 0]}
              title="독서완료"
            />
          )}
        </InfoWrapper>
        <InputWrapper>
          <Input>
            <input
              type="text"
              placeholder="기억에 남는 문구를 입력해주세요."
              value={parag}
              onChange={(e) => setParag(e.target.value)}
            />
            <span />
          </Input>
          <ImageButton
            type="button"
            onClick={addParagraphClick}
            src={`${process.env.PUBLIC_URL}/assets/add.svg`}
            alt="write"
            pc={[30, 30]}
            imgPC={[30, 30]}
          />
        </InputWrapper>
        {paragraph.map((item: ParagraphTypes) => (
          <ParagraphItem
            key={item.id}
            id={item.id}
            paragraph={item.paragraph}
            deleteParagraphClick={deleteParagraphClick}
          />
        ))}
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

const InfoWrapper = styled.div`
  box-sizing: border-box;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  .bookInfo {
    font-size: 16px;
    font-weight: 600;
  }
  .bookDate {
    font-size: 14px;
  }
  button {
    flex-shrink: 0;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .bookInfo {
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative;
  button {
    top: 5px;
    right: 0;
    position: absolute;
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
