import React, { useEffect } from 'react';
import ProtectedRoute, { ProtectedRouteProps } from 'PrivateRoute';
import { Routes, Route } from 'react-router-dom';
import {
  CategoryPage,
  MainPage,
  SignInPage,
  SignUpPage,
  ReviewPage,
  ReviewDetailPage,
  SearchPage,
  MyPage,
  MyLibraryPage,
} from './pages';

function RouteSet() {
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    authenticationPath: '/sign-in',
  };

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/category/result" element={<SearchPage />} />
      <Route path="/review" element={<ReviewPage />} />
      <Route path="/review/:id" element={<ReviewDetailPage />} />
      <Route
        path="/mypage"
        element={
          <ProtectedRoute {...defaultProtectedRouteProps} outlet={<MyPage />} />
        }
      />
      <Route path="/my-library" element={<MyLibraryPage />} />
    </Routes>
  );
}

export default RouteSet;
