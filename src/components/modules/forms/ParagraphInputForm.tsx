import { useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ParagraphInputFormType } from 'types/module';
import { ParagraphAddRequest } from 'redux/reducers/Paragraph';
import { showToast } from 'common/Toast';
import useInput from 'hooks/useInput';
import ImageButton from 'components/atoms/buttons/ImageButton';
import BorderInput from 'components/atoms/inputs/BorderInput';

function ParagraphInputForm({ bookId }: ParagraphInputFormType) {
  const dispatch = useDispatch();
  const paragRef = useRef<HTMLInputElement>(null);
  const [parag, changeParag, setParag] = useInput('');

  useEffect(() => {
    paragRef.current?.focus();
  }, []);

  const addParagraphClick = useCallback(() => {
    if (parag) {
      const data = { bookId, paragraph: parag };
      dispatch(ParagraphAddRequest(data));
      setParag('');
    } else {
      showToast('warning', '문구를 입력해주세요');
    }
  }, [parag]);

  const handleInputEnter = (event: React.KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      addParagraphClick();
    }
  };

  return (
    <InputForm>
      <BorderInput
        type="text"
        placeholder="기억에 남는 문구를 입력해주세요."
        value={parag}
        onChange={changeParag}
        onKeyPress={handleInputEnter}
        mref={paragRef}
      />

      <ImageButton
        type="button"
        handleClick={addParagraphClick}
        src={`${process.env.PUBLIC_URL}/assets/func/content-add.svg`}
        imgSize={30}
      />
    </InputForm>
  );
}

export default ParagraphInputForm;

const InputForm = styled.div`
  display: flex;
  position: relative;
  button {
    position: absolute;
    top: 8px;
    right: 0;
  }
`;
