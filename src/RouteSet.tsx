import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  CategoryPage,
  MainPage,
  SignInPage,
  SignUpPage,
  ReviewPage,
  ReviewDetailPage,
  SearchPage,
} from './pages';

function RouteSet() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/category/result" element={<SearchPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/review/:id" element={<ReviewDetailPage />} />
    </Routes>
  );
}

export default RouteSet;
