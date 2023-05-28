import { useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ParagraphInputFormType } from 'types/module';
import { paragraphAddRequest } from 'redux/reducers/paragraphReducer';
import useInput from 'hooks/useInput';
import { showToast } from 'common/Toast';
import { FUNC_IMAGE } from 'constants/image';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import BorderInput from 'components/atoms/inputs/BorderInput';

function ParagraphInputForm({ bookId }: ParagraphInputFormType) {
  const dispatch = useDispatch();
  const paragRef = useRef<HTMLInputElement>(null);
  const [paragraph, handleChangeParagraph, setParagraph] = useInput('');

  useEffect(() => {
    paragRef.current?.focus();
  }, []);

  const handleParagraphAdd = useCallback(() => {
    if (paragraph) {
      const data = { bookId, paragraph };
      dispatch(paragraphAddRequest(data));
      setParagraph('');
    } else {
      showToast('warning', '문구를 입력해주세요');
    }
  }, [paragraph]);

  const handleInputEnter = (event: React.KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      handleParagraphAdd();
    }
  };

  return (
    <ParagraphInputFormModule>
      <BorderInput
        type="text"
        placeholder="기억에 남는 문구를 입력해주세요."
        value={paragraph}
        onChange={handleChangeParagraph}
        onKeyPress={handleInputEnter}
        mref={paragRef}
      />

      <DefaultButton
        className="image"
        width="auto"
        height={30}
        type="button"
        handleClick={handleParagraphAdd}
        imageSrc={FUNC_IMAGE.COMMENT_ADD}
        imageSize={30}
      />
    </ParagraphInputFormModule>
  );
}

export default ParagraphInputForm;

const ParagraphInputFormModule = styled.div`
  display: flex;
  position: relative;
  button {
    position: absolute;
    top: 8px;
    right: 0;
  }
`;
