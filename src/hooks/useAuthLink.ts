import { useNavigate } from 'react-router-dom';

export function useAuthLink(): {
  handleAuthClick: (
    link: string,
    compLink: string[],
    toggle: () => void,
  ) => void;
} {
  const navigate = useNavigate();

  const handleAuthClick = (
    link: string,
    compLink: string[],
    toggle: () => void,
  ) => {
    if (compLink.includes(link) && sessionStorage.getItem('accessToken')) {
      navigate(link);
    } else if (
      compLink.includes(link) &&
      !sessionStorage.getItem('accessToken')
    ) {
      toggle();
    } else {
      navigate(link);
    }
  };

  return { handleAuthClick };
}
