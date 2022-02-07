/* eslint-disable react/jsx-no-useless-fragment */
import React, { PropsWithChildren } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';
import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';

function Index({ children }: PropsWithChildren<any>) {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/sign-up' || location.pathname === '/sign-in' ? (
        <>
          <TopWrapper>
            <Header />
          </TopWrapper>
          <main>{children}</main>
        </>
      ) : (
        <>
          <TopWrapper>
            <Header />
            <Nav />
          </TopWrapper>
          <main>{children}</main>
          <BottomWrapper>
            <Footer />
          </BottomWrapper>
        </>
      )}
    </>
  );
}

export default Index;

const TopWrapper = styled.section`
  background-color: #1e90ff;
`;

const BottomWrapper = styled.section`
  background-color: #303538;
  height: 240px;
`;
