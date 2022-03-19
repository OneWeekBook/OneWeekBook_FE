import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  CategoryPage,
  MainPage,
  SignInPage,
  SignUpPage,
  ReviewPage,
} from './pages';

function RouteSet() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/review" element={<ReviewPage />} />
    </Routes>
  );
}

export default RouteSet;
