import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainPage, SignInPage } from './pages';

function RouteSet() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
    </Routes>
  );
}

export default RouteSet;
