import styled from 'styled-components';
import { TagLabelType } from 'types/module';
import TagText from 'components/atoms/texts/TagText';
import DefaultText from 'components/atoms/texts/DefaultText';

function TagLabel({ tags }: TagLabelType) {
  return (
    <TagLabelModule>
      <DefaultText content="전체 검색 결과" fontSize={2.2} reactive />
      {Array.from(tags).map((item, index) => (
        <TagText key={index} content={item} />
      ))}
    </TagLabelModule>
  );
}

export default TagLabel;

const TagLabelModule = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 20px auto 0;
`;
