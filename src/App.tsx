import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import Theme from 'styles/theme';
import GlobalStyles from 'styles/globalStyle';
import RouteSet from 'RouteSet';
import Layout from 'common';
import 'styles/sprite.css';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Layout>
        <RouteSet />
      </Layout>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
