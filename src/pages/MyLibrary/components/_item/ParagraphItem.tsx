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
        <img
          src={`${process.env.PUBLIC_URL}/assets/close.svg`}
          alt="close"
          height={30}
        />
      </button>
    </ParagraphItemWrapper>
  );
}

export default ParagraphItem;

const ParagraphItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 2px solid gray;
  border-radius: 5px;
  margin: 10px auto;
  padding: 10px;
  button {
    height: 30px;
    border: none;
  }
`;

const Paragraph = styled.p`
  font-size: 16px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 14px;
  }
`;
