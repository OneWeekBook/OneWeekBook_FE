import { getAccessTokenFromSessionStorage } from 'utils/accessTokenHandler';
import useRouter from './useRouter';

function useAuthLink() {
  const { routeTo, currentPath } = useRouter();

  const handleAuthClick = (
    link: string,
    compLink: string[],
    handleModaltoggle: () => void,
    handletoggle?: () => void,
  ) => {
    const token = getAccessTokenFromSessionStorage();
    if (handletoggle && compLink.includes(link) && token) {
      routeTo(link, link === currentPath);
      handletoggle();
    } else if (compLink.includes(link) && token) {
      routeTo(link, link === currentPath);
    } else if (compLink.includes(link) && !token) {
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
