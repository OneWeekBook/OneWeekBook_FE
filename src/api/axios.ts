import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASIC_URL}`,
});

instance.defaults.headers.common.Authorization = `${sessionStorage.getItem(
  'accessToken',
)}`;

export default instance;
