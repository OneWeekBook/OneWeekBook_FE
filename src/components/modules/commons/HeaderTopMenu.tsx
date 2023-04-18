import styled from 'styled-components';
import { HeaderTypes } from 'types/module';
import ImageButton from 'components/atoms/buttons/ImageButton';
import DefaultLink from 'components/atoms/links/DefaultLink';

function HeaderTopMenu({ handleToggle, handleSignout }: HeaderTypes) {
  return (
    <HeaderTopMenuModule>
      <DefaultLink
        to="/"
        content="ONEWEEKBOOK"
        fontSize={3.2}
        fontWeight={700}
      />
      {sessionStorage.getItem('accessToken') ? (
        <LinkWrapper>
          <DefaultLink to="/myPage" content="마이페이지" />
          <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <DefaultLink to="/" content="로그아웃" handleClick={handleSignout} />
        </LinkWrapper>
      ) : (
        <LinkWrapper>
          <DefaultLink to="/sign-up" content="회원가입" />
          <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
          <DefaultLink to="/sign-in" content="로그인" />
        </LinkWrapper>
      )}
      <ImageButton
        src={`${process.env.PUBLIC_URL}/assets/func/hamburger.svg`}
        imgSize={32}
        handleClick={handleToggle}
      />
    </HeaderTopMenuModule>
  );
}

export default HeaderTopMenu;

const HeaderTopMenuModule = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.color.COLOR_CORAL};
  margin: 10px 0;
  button {
    display: none;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    margin: 10px auto;
    width: 95%;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    button {
      display: inline-block;
    }
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: none;
  }
`;
