import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ParagraphAddRequest } from 'redux/reducers/Paragraph';
import { Toast } from 'lib/Toast';
import ImageButton from 'components/Button/ImageButton';

type PropsType = {
  bookId: number;
};

function InputWrapper({ bookId }: PropsType) {
  const dispatch = useDispatch();
  const [parag, setParag] = useState<string>('');

  const addParagraphClick = useCallback(() => {
    if (parag) {
      const data = { bookId, paragraph: parag };
      dispatch(ParagraphAddRequest(data));
      setParag('');
    } else {
      Toast('warning', '문구를 입력해주세요');
    }
  }, [parag]);

  return (
    <Wrapper>
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
