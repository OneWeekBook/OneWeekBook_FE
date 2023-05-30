import axios from 'axios';
import { getAccessTokenFromSessionStorage } from 'utils/accessTokenHandler';

const accessToken = getAccessTokenFromSessionStorage();
const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BASIC_URL}`,
});

if (accessToken) {
  instance.defaults.headers.common.Authorization = accessToken;
}

export default instance;
