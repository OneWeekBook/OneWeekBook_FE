import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import configureStore from 'redux/store';
import Theme from 'styles/theme';
import { ToastContainer } from 'react-toastify';
import GlobalStyles from 'styles/globalStyle';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-toastify/dist/ReactToastify.css';
import './styles/font.css';

const store = configureStore();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <App />
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
