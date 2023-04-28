import styled from 'styled-components';
import { ParagraphCardTypes } from 'types/module';
import { FUNC_IMAGE } from 'constants/image';
import ImageButton from 'components/atoms/buttons/ImageButton';
import DefaultText from 'components/atoms/texts/DefaultText';

function ParagraphCard({
  id,
  paragraph,
  deleteParagraphClick,
}: ParagraphCardTypes) {
  return (
    <ParagraphCardContainer>
      <DefaultText content={paragraph} />
      <ImageButton
        type="button"
        handleClick={() => deleteParagraphClick(id)}
        src={FUNC_IMAGE.COMMENT_DELETE}
        imgSize={32}
      />
    </ParagraphCardContainer>
  );
}

export default ParagraphCard;

const ParagraphCardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 2px solid ${({ theme }) => theme.color.COLOR_GRAY};
  border-radius: 5px;
  padding: 5px 10px;
`;
