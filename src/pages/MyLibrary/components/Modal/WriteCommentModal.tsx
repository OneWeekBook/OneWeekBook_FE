import { useEffect, useState } from 'react';
import WriteModal from 'components/Modal';
import styled from 'styled-components';
import { SetStartDate } from 'lib/SetDate';
import { InfoTypes, ParagraphTypes } from 'types/book';
import { useDispatch, useSelector } from 'react-redux';
import {
  ParagraphAddRequest,
  ParagraphDeleteRequest,
  ParagraphInit,
  ParagraphRequest,
} from 'redux/reducers/Paragraph';
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
    const data = { bookId, paragraph: parag };
    dispatch(ParagraphAddRequest(data));
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
            <p>
              {bookData.author.replaceAll('<b>', '').replaceAll('</b>', '')}
              {' | '}
              {SetStartDate(bookData.startTime)}
            </p>
          </div>
          {bookData.progress === 1 && (
            <button type="button" onClick={moveDoneClick}>
              독서 완료
            </button>
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
          <button type="button" onClick={addParagraphClick}>
            <img
              src={`${process.env.PUBLIC_URL}/assets/add.svg`}
              alt="write"
              height={30}
            />
          </button>
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
  button {
    border: none;
    border-radius: 10px;
    width: 100px;
    height: 40px;
    flex-shrink: 0;
    font-size: 16px;
    font-weight: 600;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .bookInfo {
      font-size: 14px;
      font-weight: 600;
    }
    button {
      width: 80px;
      height: 35px;
      font-size: 14px;
    }
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
    background-color: white;
    width: 40px;
    height: 30px;
    font-weight: 600;
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
