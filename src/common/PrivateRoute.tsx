import { Navigate } from 'react-router-dom';
import { ProtectedRouteTypes } from 'types/common';

export default function ProtectedRoute({
  authenticationPath,
  outlet,
}: ProtectedRouteTypes) {
  if (sessionStorage.getItem('accessToken')) {
    return outlet;
  }
  return <Navigate to={{ pathname: authenticationPath }} />;
}
