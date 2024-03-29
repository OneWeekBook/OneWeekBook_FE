import styled from 'styled-components';
import { MainLabelTypes } from 'types/module';
import DefaultLabel from 'components/atoms/labels/DefaultLabel';

function MainLabel({ title, subTitle, fontSize }: MainLabelTypes) {
  return (
    <MainLabelModule>
      <Bar />
      <DefaultLabel
        content={title}
        subContent={subTitle}
        fontSize={fontSize}
        reactive
      />
      <Bar />
    </MainLabelModule>
  );
}

export default MainLabel;

const MainLabelModule = styled.div`
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
  background-color: ${({ theme }) => theme.color.COLOR_CORAL};
`;
