import { useNavigate } from 'react-router';

function useRouter() {
  const router = useNavigate();
  const params = new URLSearchParams(window.location.search);
  return {
    currentPath: window.location.pathname,
    currentSearch: params,
    routeTo: (path: string, replace = false) => {
      if (isNaN(Number(path))) router(path, { replace });
      else router(Number(path));
    },
  };
}

export default useRouter;
