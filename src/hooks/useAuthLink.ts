import { getAccessTokenFromSessionStorage } from 'utils/accessTokenHandler';
import useRouter from './useRouter';

function useAuthLink(): {
  handleAuthClick: (
    link: string,
    compLink: string[],
    handleModaltoggle: () => void,
    handletoggle?: () => void,
  ) => void;
} {
  const { routeTo, currentPath } = useRouter();

  const handleAuthClick = (
    link: string,
    compLink: string[],
    handleModaltoggle: () => void,
    handletoggle?: () => void,
  ) => {
    if (
      handletoggle &&
      compLink.includes(link) &&
      getAccessTokenFromSessionStorage()
    ) {
      routeTo(link, link === currentPath);
      handletoggle();
    } else if (compLink.includes(link) && getAccessTokenFromSessionStorage()) {
      routeTo(link, link === currentPath);
    } else if (compLink.includes(link) && !getAccessTokenFromSessionStorage()) {
      handleModaltoggle();
    } else if (handletoggle) {
      routeTo(link, link === currentPath);
      handletoggle();
    } else {
      routeTo(link, link === currentPath);
    }
  };

  return { handleAuthClick };
}

export default useAuthLink;
