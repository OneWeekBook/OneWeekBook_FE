import styled from 'styled-components';
import DefaultLabel from 'components/atoms/labels/DefaultLabel';

interface PropsType {
  title: string;
  subTitle: string;
  fontSize?: number;
}

function MainLabel({ title, subTitle, fontSize }: PropsType) {
  return (
    <MainLabelContainer>
      <Bar />
      <DefaultLabel
        content={title}
        subContent={subTitle}
        fontSize={fontSize}
        reactive
      />
      <Bar />
    </MainLabelContainer>
  );
}

export default MainLabel;

const MainLabelContainer = styled.div`
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  div {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const Bar = styled.span`
  flex-grow: 2;
  height: 2px;
  background-color: #f7b7a9;
`;
