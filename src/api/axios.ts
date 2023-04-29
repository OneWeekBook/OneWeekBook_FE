import axios from 'axios';

const accessToken = sessionStorage.getItem('accessToken');
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASIC_URL}`,
});

if (accessToken) {
  instance.defaults.headers.common.Authorization = `${sessionStorage.getItem(
    'accessToken',
  )}`;
}

export default instance;
