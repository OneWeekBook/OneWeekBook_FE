import styled from 'styled-components';
import { LinkTypes } from 'types/atom';

function SideBarLink({ content, handleClick }: LinkTypes) {
  return <SideBarLinkAtom onClick={handleClick}>{content}</SideBarLinkAtom>;
}

export default SideBarLink;

const SideBarLinkAtom = styled.p`
  display: block;
  color: ${({ theme }) => theme.color.COLOR_BLACK};
  cursor: pointer;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.color.COLOR_GRAY};
  transition: 0.5s;
  text-align: right;
  font-size: 2.4rem;
  font-weight: 500;
  padding: 10px 20px;
  &:hover {
    color: ${({ theme }) => theme.color.COLOR_CORAL};
  }
`;
