import { LOCALSTORAGE_TOKEN_KEY } from 'constants/content';

export const saveAccessTokenToSessionStorage = (accessToken: string) => {
  localStorage.setItem(LOCALSTORAGE_TOKEN_KEY, accessToken);
};

export const getAccessTokenFromSessionStorage = (): string | null => {
  return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) || null;
};

export const removeAccessTokenFromSessionStorage = () => {
  localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
};
