import React from 'react';
import styled from 'styled-components';
import ImageButton from 'components/Button/ImageButton';

type PropsType = {
  id: number;
  paragraph: string;
  deleteParagraphClick: (id: number) => void;
};

function ParagraphItem({ id, paragraph, deleteParagraphClick }: PropsType) {
  return (
    <ParagraphItemWrapper>
      <Paragraph>{paragraph}</Paragraph>
      <ImageButton
        type="button"
        onClick={() => deleteParagraphClick(id)}
        src={`${process.env.PUBLIC_URL}/assets/func/content-delete.svg`}
        alt="close"
        pc={[30, 30]}
        imgPC={[30, 30]}
      />
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
`;

const Paragraph = styled.p`
  font-size: 16px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 14px;
  }
`;
