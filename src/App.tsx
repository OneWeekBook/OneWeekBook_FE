import { Routes, Route } from 'react-router-dom';
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
import ProtectedRoute, { ProtectedRouteProps } from 'common/PrivateRoute';
import GeneralLayout from 'common';

function App() {
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    authenticationPath: '/sign-in',
  };

  return (
    <GeneralLayout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/category/result" element={<SearchPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/review/:id" element={<BookPage />} />
        <Route
          path="/mypage"
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<UserPage />}
            />
          }
        />
        <Route path="/my-library" element={<LibraryPage />} />
      </Routes>
    </GeneralLayout>
  );
}

export default App;
