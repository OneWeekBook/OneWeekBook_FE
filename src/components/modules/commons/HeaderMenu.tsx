import styled from 'styled-components';
import { HeaderTypes } from 'types/module';
import { FUNC_IMAGE } from 'constants/image';
import { PATH_URL } from 'constants/path';
import { getAccessTokenFromSessionStorage } from 'utils/accessTokenHandler';
import ImageButton from 'components/atoms/buttons/ImageButton';
import DefaultLink from 'components/atoms/links/DefaultLink';

function HeaderMenu({ handleToggle, handleSignOut }: HeaderTypes) {
  return (
    <HeaderMenuModule>
      <DefaultLink
        to={PATH_URL.MAIN}
        content="ONEWEEKBOOK"
        fontSize={3.2}
        fontWeight={700}
      />
      {getAccessTokenFromSessionStorage() ? (
        <DefaultLinks>
          <DefaultLink to={PATH_URL.USER} content="마이페이지" />
          <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <DefaultLink
            to={PATH_URL.MAIN}
            content="로그아웃"
            handleClick={handleSignOut}
          />
        </DefaultLinks>
      ) : (
        <DefaultLinks>
          <DefaultLink to={PATH_URL.SIGN_UP} content="회원가입" />
          <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <DefaultLink to={PATH_URL.SIGN_IN} content="로그인" />
        </DefaultLinks>
      )}
      <ImageButton
        src={FUNC_IMAGE.HAMBURGER}
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
  button {
    display: none;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    button {
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
