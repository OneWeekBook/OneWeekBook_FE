import React from 'react';
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
  Mypage,
} from './pages';

function RouteSet() {
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: !!sessionStorage.getItem('accessToken'),
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
          <ProtectedRoute {...defaultProtectedRouteProps} outlet={<Mypage />} />
        }
      />
    </Routes>
  );
}

export default RouteSet;
