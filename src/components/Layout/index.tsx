/* eslint-disable react/jsx-no-useless-fragment */
import { useToggle } from 'hooks/useToggle';
import TopScroll from 'lib/TopScroll';
import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { AuthUserRequest } from 'redux/reducers/AuthUser';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';
import Sidebar from './Sidebar';

function Index({ children }: PropsWithChildren<any>) {
  const location = useLocation();
  const dispatch = useDispatch();
  const [toggle, toggleIsOn] = useToggle(false);
  const { userToggle } = useSelector((state: any) => state.func);
  const { isSuccess } = useSelector((state: any) => state.signIn);

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
        <TopWrapper>
          <Header />
        </TopWrapper>
      ) : (
        <TopWrapper>
          <Header toggleIsOn={toggleIsOn} />
          <Nav />
          <Sidebar toggle={toggle} toggleIsOn={toggleIsOn} />
        </TopWrapper>
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
  display: flex;
  height: 100vh;
  flex-direction: column;
  margin: auto;
  main {
    align-items: center;
    flex-grow: 1;
  }
`;

const TopWrapper = styled.section`
  background-color: #1e90ff;
`;

const BottomWrapper = styled.section`
  background-color: #303538;
  min-height: 200px;
`;
