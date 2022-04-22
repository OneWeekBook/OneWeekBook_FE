import styled from 'styled-components';

type PropsType = {
  id: number;
  paragraph: string;
  deleteParagraphClick: (id: number) => void;
};

function ParagraphItem({ id, paragraph, deleteParagraphClick }: PropsType) {
  return (
    <ParagraphItemWrapper>
      <Paragraph>{paragraph}</Paragraph>
      <button type="button" onClick={() => deleteParagraphClick(id)}>
        X
      </button>
    </ParagraphItemWrapper>
  );
}

export default ParagraphItem;

const ParagraphItemWrapper = styled.div`
  position: relative;
  button {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const Paragraph = styled.div`
  box-sizing: border-box;
  border: 1px solid gray;
  border-radius: 5px;
  margin: 10px auto;
  padding: 10px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 14px;
  }
`;
