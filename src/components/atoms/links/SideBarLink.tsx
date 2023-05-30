import styled from 'styled-components';
import { LinkTypes } from 'types/atom';

function SideBarLink({ imageSrc, content, handleClick }: LinkTypes) {
  return (
    <SideBarLinkAtom onClick={handleClick}>
      <img src={imageSrc} alt="menu" width={32} height={32} />
      <p>{content}</p>
    </SideBarLinkAtom>
  );
}

export default SideBarLink;

const SideBarLinkAtom = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.5s;
  text-align: right;
  padding: 10px 20px;
  p {
    font-size: 2.4rem;
    font-weight: 500;
    color: ${({ theme }) => theme.color.COLOR_CORAL};
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.COLOR_LEMON_CHIFFON};
  }
`;
