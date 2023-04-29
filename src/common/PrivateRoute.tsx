import { Navigate } from 'react-router-dom';
import { ProtectedRouteTypes } from 'types/common';
import { getAccessTokenFromSessionStorage } from 'utils/accessTokenHandler';

export default function ProtectedRoute({
  authenticationPath,
  outlet,
}: ProtectedRouteTypes) {
  if (getAccessTokenFromSessionStorage()) {
    return outlet;
  }
  return <Navigate to={{ pathname: authenticationPath }} />;
}
