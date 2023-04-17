import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { AuthUserRequest } from 'redux/reducers/AuthUser';
import useToggle from 'hooks/useToggle';
import TopScroll from 'lib/TopScroll';
import DefaultLink from 'components/atoms/links/DefaultLink';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

function Index({ children }: PropsWithChildren<any>) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [toggle, handleToggle] = useToggle(false);
  const userToggle = useSelector(
    (state: AppStateType) => state.func.userToggle,
  );
  const isSuccess = useSelector(
    (state: AppStateType) => state.signIn.isSuccess,
  );

  useEffect(() => {
    dispatch(AuthUserRequest());
  }, [userToggle]);

  useEffect(() => {
    if (isSuccess) dispatch(AuthUserRequest());
  }, [isSuccess]);

  return (
    <LayoutWrapper>
      <TopScroll />
      {location.pathname === '/sign-up' || location.pathname === '/sign-in' ? (
        <HeaderWrapper>
          <DefaultLink
            to="/"
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
    </LayoutWrapper>
  );
}

export default Index;

const LayoutWrapper = styled.section`
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
`;

const FooterWrapper = styled.section`
  background-color: ${({ theme }) => theme.color.COLOR_LAYOUT_ONE};
  min-height: 200px;
`;
