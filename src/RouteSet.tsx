import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CategoryPage, MainPage, SignInPage, SignUpPage } from './pages';

function RouteSet() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/category" element={<CategoryPage />} />
    </Routes>
  );
}

export default RouteSet;
