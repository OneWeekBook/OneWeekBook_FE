import React from 'react';
import { ThemeProvider } from 'styled-components';
import Theme from 'styles/theme';
import GlobalStyles from 'styles/globalStyle';
import RouteSet from 'RouteSet';
import Layout from 'components/Layout';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Layout>
        <RouteSet />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
