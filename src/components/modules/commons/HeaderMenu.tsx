import styled from 'styled-components';
import { HeaderTypes } from 'types/module';
import { FUNC_IMAGE } from 'constants/image';
import { PATH_URL } from 'constants/path';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import DefaultLink from 'components/atoms/links/DefaultLink';

function HeaderMenu({ handleToggle, handleSignOut, isAuth }: HeaderTypes) {
  return (
    <HeaderMenuModule>
      <DefaultLink
        to={PATH_URL.MAIN}
        content="ONEWEEKBOOK"
        fontSize={3.2}
        fontWeight={700}
      />
      {isAuth ? (
        <DefaultLinks>
          <DefaultLink to={PATH_URL.USER} content="마이페이지" />
          <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <SignOutButton onClick={handleSignOut}>로그아웃</SignOutButton>
        </DefaultLinks>
      ) : (
        <DefaultLinks>
          <DefaultLink to={PATH_URL.SIGN_UP} content="회원가입" />
          <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <DefaultLink to={PATH_URL.SIGN_IN} content="로그인" />
        </DefaultLinks>
      )}
      <DefaultButton
        className="image"
        width="auto"
        height={32}
        imageSrc={FUNC_IMAGE.HAMBURGER}
        imageSize={32}
        handleClick={handleToggle}
      />
    </HeaderMenuModule>
  );
}

export default HeaderMenu;

const HeaderMenuModule = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.color.COLOR_CORAL};
  .image {
    display: none;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .image {
      display: inline-block;
    }
  }
`;

const DefaultLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: none;
  }
`;

const SignOutButton = styled.button`
  color: ${({ theme }) => theme.color.COLOR_CORAL};
  font-size: 1.6rem;
  font-weight: 300;
  border: none;
  background-color: ${({ theme }) => theme.color.COLOR_NONE};
`;
