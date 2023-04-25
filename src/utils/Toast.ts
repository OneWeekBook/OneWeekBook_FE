import { toast } from 'react-toastify';

export function Toast(type: string, message: string) {
  const isMobile = () => {
    return /Android|webOs|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  };

  if (type === 'success') {
    toast.success(message, {
      position: `${isMobile() ? 'bottom-center' : 'top-right'}`,
      autoClose: 500,
    });
  } else if (type === 'warning') {
    toast.warning(message, {
      position: `${isMobile() ? 'bottom-center' : 'top-right'}`,
      autoClose: 1500,
    });
  } else if (type === 'error') {
    toast.error(message, {
      position: `${isMobile() ? 'bottom-center' : 'top-right'}`,
      autoClose: 1500,
    });
  } else if (type === 'info') {
    toast.info(message, {
      position: `${isMobile() ? 'bottom-center' : 'top-right'}`,
      autoClose: 1000,
    });
  }
}
