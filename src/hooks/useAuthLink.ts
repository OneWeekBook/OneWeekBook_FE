import { useNavigate } from 'react-router-dom';

function useAuthLink(): {
  handleAuthClick: (
    link: string,
    compLink: string[],
    Modaltoggle: () => void,
    toggle?: () => void,
  ) => void;
} {
  const navigate = useNavigate();

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
      navigate(link);
      toggle();
    } else if (
      compLink.includes(link) &&
      sessionStorage.getItem('accessToken')
    ) {
      navigate(link);
    } else if (
      compLink.includes(link) &&
      !sessionStorage.getItem('accessToken')
    ) {
      Modaltoggle();
    } else if (toggle) {
      navigate(link);
      toggle();
    } else {
      navigate(link);
    }
  };

  return { handleAuthClick };
}

export default useAuthLink;
