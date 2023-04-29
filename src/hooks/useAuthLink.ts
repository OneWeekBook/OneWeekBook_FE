import useRouter from './useRouter';

function useAuthLink(): {
  handleAuthClick: (
    link: string,
    compLink: string[],
    Modaltoggle: () => void,
    toggle?: () => void,
  ) => void;
} {
  const { routeTo, currentPath } = useRouter();

  const handleAuthClick = (
    link: string,
    compLink: string[],
    Modaltoggle: () => void,
    toggle?: () => void,
  ) => {
    if (
      toggle &&
      compLink.includes(link) &&
      sessionStorage.getItem('accessToken')
    ) {
      routeTo(link, link === currentPath);
      toggle();
    } else if (
      compLink.includes(link) &&
      sessionStorage.getItem('accessToken')
    ) {
      routeTo(link, link === currentPath);
    } else if (
      compLink.includes(link) &&
      !sessionStorage.getItem('accessToken')
    ) {
      Modaltoggle();
    } else if (toggle) {
      routeTo(link, link === currentPath);
      toggle();
    } else {
      routeTo(link, link === currentPath);
    }
  };

  return { handleAuthClick };
}

export default useAuthLink;
