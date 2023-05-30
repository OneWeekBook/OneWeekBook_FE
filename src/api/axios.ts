import axios from 'axios';
import { getAccessTokenFromSessionStorage } from 'utils/accessTokenHandler';

const accessToken = getAccessTokenFromSessionStorage();

const host =
  window.location.hostname === 'localhost'
    ? process.env.REACT_APP_SERVER_URL
    : 'api';

const instance = axios.create({
  baseURL: host,
});

if (accessToken) {
  instance.defaults.headers.common.Authorization = accessToken;
}

export default instance;
