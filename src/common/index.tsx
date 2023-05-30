import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { authUserRequest } from 'redux/reducers/authUserReducer';
import useToggle from 'hooks/useToggle';
import { PATH_URL } from 'constants/path';
import DefaultLink from 'components/atoms/links/DefaultLink';
import { getAccessTokenFromSessionStorage } from 'utils/accessTokenHandler';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

function Index({ children }: PropsWithChildren) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [toggle, handleToggle] = useToggle(false);
  const { isSuccess: signInSuccess } = useSelector(
    (state: AppStateType) => state.signIn,
  );
  const { isSuccess: changeNickSuccess } = useSelector(
    (state: AppStateType) => state.changeNick,
  );

  useEffect(() => {
    if (
      signInSuccess ||
      changeNickSuccess ||
      getAccessTokenFromSessionStorage()
    )
      dispatch(authUserRequest());
  }, [signInSuccess, changeNickSuccess]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <GeneralLayout>
      {[PATH_URL.SIGN_UP, PATH_URL.SIGN_IN].some((path) =>
        pathname.includes(path),
      ) ? (
        <HeaderWrapper>
          <DefaultLink
            to={PATH_URL.MAIN}
            content="ONEWEEKBOOK"
            fontSize={3.2}
            fontWeight={700}
          />
        </HeaderWrapper>
      ) : (
        <HeaderWrapper>
          <Header handleToggle={handleToggle} />
          <Sidebar toggle={toggle} handleToggle={handleToggle} />
        </HeaderWrapper>
      )}
      <main>{children}</main>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </GeneralLayout>
  );
}

export default Index;

const GeneralLayout = styled.section`
  min-width: 375px;
  display: flex;
  height: 100vh;
  flex-direction: column;
  margin: auto;
  main {
    align-items: center;
    flex-grow: 1;
  }
`;

const HeaderWrapper = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const FooterWrapper = styled.section`
  background-color: ${({ theme }) => theme.color.COLOR_DIM_GRAY};
  height: 200px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    height: 160px;
  }
`;
