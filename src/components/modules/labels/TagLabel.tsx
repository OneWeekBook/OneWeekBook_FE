import styled from 'styled-components';
import theme from 'styles/theme';
import { TagLabelType } from 'types/module';
import DefaultText from 'components/atoms/texts/DefaultText';

function TagLabel({ tags }: TagLabelType) {
  return (
    <TagLabelModule>
      <DefaultText content="전체 검색 결과" fontSize={2.2} reactive />
      {Array.from(tags).map((item, index) => (
        <DefaultText
          key={index}
          className="tagbox"
          content={item}
          fontColor={theme.color.COLOR_WHITE}
        />
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
