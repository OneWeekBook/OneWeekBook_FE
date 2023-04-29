import { Routes, Route } from 'react-router-dom';
import { PATH_URL } from 'constants/path';
import { ProtectedRouteTypes } from 'types/common';
import GeneralLayout from 'common';
import ProtectedRoute from 'common/PrivateRoute';
import {
  MainPage,
  CategoryPage,
  SignInPage,
  SignUpPage,
  ReviewPage,
  BookPage,
  SearchPage,
  UserPage,
  LibraryPage,
} from 'components/pages';

function App() {
  const defaultProtectedRouteProps: Omit<ProtectedRouteTypes, 'outlet'> = {
    authenticationPath: PATH_URL.SIGN_IN,
  };

  return (
    <GeneralLayout>
      <Routes>
        <Route path={PATH_URL.MAIN} element={<MainPage />} />
        <Route path={PATH_URL.SIGN_IN} element={<SignInPage />} />
        <Route path={PATH_URL.SIGN_UP} element={<SignUpPage />} />
        <Route path={PATH_URL.CATEGORY} element={<CategoryPage />} />
        <Route path={PATH_URL.SEARCH} element={<SearchPage />} />
        <Route path={PATH_URL.REVIEW} element={<ReviewPage />} />
        <Route path={`${PATH_URL.REVIEW}/:id`} element={<BookPage />} />
        <Route
          path={PATH_URL.USER}
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<UserPage />}
            />
          }
        />
        <Route path={PATH_URL.LIBRARY} element={<LibraryPage />} />
      </Routes>
    </GeneralLayout>
  );
}

export default App;
