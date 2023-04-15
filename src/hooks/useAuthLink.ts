import { useNavigate, useLocation } from 'react-router-dom';

function useAuthLink(): {
  handleAuthClick: (
    link: string,
    compLink: string[],
    Modaltoggle: () => void,
    toggle?: () => void,
  ) => void;
} {
  const navigate = useNavigate();
  const location = useLocation();

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
      navigate(link, { replace: link === location.pathname });
      toggle();
    } else if (
      compLink.includes(link) &&
      sessionStorage.getItem('accessToken')
    ) {
      navigate(link, { replace: link === location.pathname });
    } else if (
      compLink.includes(link) &&
      !sessionStorage.getItem('accessToken')
    ) {
      Modaltoggle();
    } else if (toggle) {
      navigate(link, { replace: link === location.pathname });
      toggle();
    } else {
      navigate(link, { replace: link === location.pathname });
    }
  };

  return { handleAuthClick };
}

export default useAuthLink;
