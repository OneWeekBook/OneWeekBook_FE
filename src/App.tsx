import React from 'react';
import { ThemeProvider } from 'styled-components';
import Theme from 'styles/theme';
import GlobalStyles from 'styles/globalStyle';
import RouteSet from 'RouteSet';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <RouteSet />
    </ThemeProvider>
  );
}

export default App;
