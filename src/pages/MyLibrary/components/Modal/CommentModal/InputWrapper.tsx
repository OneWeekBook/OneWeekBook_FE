import { useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ParagraphAddRequest } from 'redux/reducers/Paragraph';
import { Toast } from 'lib/Toast';
import useInput from 'hooks/useInput';
import ImageButton from 'components/Button/ImageButton';
import FormInput from 'components/Input/FormInput';

type PropsType = {
  bookId: number;
};

function InputWrapper({ bookId }: PropsType) {
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
      Toast('warning', '문구를 입력해주세요');
    }
  }, [parag]);

  const onParagInputEnter = (event: React.KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      addParagraphClick();
    }
  };

  return (
    <Wrapper>
      <FormInput
        type="text"
        placeholder="기억에 남는 문구를 입력해주세요."
        state={parag}
        onChange={changeParag}
        onKeyPress={onParagInputEnter}
        mref={paragRef}
      />
      <ImageButton
        type="button"
        onClick={addParagraphClick}
        src={`${process.env.PUBLIC_URL}/assets/func/content-add.svg`}
        alt="write"
        pc={[30, 30]}
        imgPC={[30, 30]}
      />
    </Wrapper>
  );
}

export default InputWrapper;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  button {
    top: 5px;
    right: 0;
    position: absolute;
  }
`;
