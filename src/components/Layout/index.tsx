import { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { AuthUserRequest } from 'redux/reducers/AuthUser';
import useToggle from 'hooks/useToggle';
import TopScroll from 'lib/TopScroll';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import Sidebar from './Sidebar';

function Index({ children }: PropsWithChildren<any>) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [toggle, toggleIsOn] = useToggle(false);
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
        <section>
          <Header />
        </section>
      ) : (
        <section>
          <Header toggleIsOn={toggleIsOn} />
          <Nav />
          <Sidebar toggle={toggle} toggleIsOn={toggleIsOn} />
        </section>
      )}
      <main>{children}</main>
      <BottomWrapper>
        <Footer />
      </BottomWrapper>
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

const BottomWrapper = styled.section`
  background-color: ${({ theme }) => theme.color.COLOR_LAYOUT_ONE};
  min-height: 200px;
`;
