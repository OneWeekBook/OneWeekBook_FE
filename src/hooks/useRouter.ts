import { useNavigate } from 'react-router';

function useRouter() {
  const router = useNavigate();

  return {
    currentPath: window.location.pathname,
    routeTo: (path: string, replace = false) => {
      if (isNaN(Number(path))) router(path, { replace });
      else router(Number(path));
    },
  };
}

export default useRouter;
