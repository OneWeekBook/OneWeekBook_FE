import styled from 'styled-components';
import { DefaultTextTypes, TextStyleTypes } from 'types/atom';

function TagText({ content }: DefaultTextTypes) {
  return <TagTextAtom>{content}</TagTextAtom>;
}

export default TagText;

const TagTextAtom = styled.p<TextStyleTypes>`
  padding: 2px 10px;
  color: ${({ theme }) => theme.color.COLOR_WHITE};
  font-weight: 500;
  font-size: 1.6rem;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.COLOR_CORAL};
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 1.2rem;
  }
`;
