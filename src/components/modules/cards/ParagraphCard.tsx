import styled from 'styled-components';
import { ParagraphCardTypes } from 'types/module';
import { FUNC_IMAGE } from 'constants/image';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import DefaultText from 'components/atoms/texts/DefaultText';

function ParagraphCard({
  id,
  paragraph,
  deleteParagraphClick,
}: ParagraphCardTypes) {
  return (
    <ParagraphCardModule>
      <DefaultText content={paragraph} />
      <DefaultButton
        className="image"
        width="auto"
        height={32}
        type="button"
        handleClick={() => deleteParagraphClick(id)}
        imageSrc={FUNC_IMAGE.COMMENT_DELETE}
        imageSize={32}
      />
    </ParagraphCardModule>
  );
}

export default ParagraphCard;

const ParagraphCardModule = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border: 2px solid ${({ theme }) => theme.color.COLOR_GRAY};
  border-radius: 5px;
  padding: 5px 10px;
`;
