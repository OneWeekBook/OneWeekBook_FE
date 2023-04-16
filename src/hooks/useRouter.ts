import { useNavigate } from 'react-router';

function useRouter(replace = false) {
  const router = useNavigate();

  return {
    currentPath: window.location.pathname,
    routeTo: (path: string) => {
      if (isNaN(Number(path))) router(path, { replace });
      else router(Number(path));
    },
  };
}

export default useRouter;
