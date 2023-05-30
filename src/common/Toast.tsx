import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';

export function showToast(type: string, message: string) {
  const isMobile = () => {
    return /Android|webOs|iPhone|iPad|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  };

  const toastOption = {
    position: isMobile()
      ? toast.POSITION.BOTTOM_CENTER
      : toast.POSITION.TOP_RIGHT,
    autoClose: 1000,
    className: 'toast-message',
  };

  if (type === 'success') {
    toast.success(message, toastOption);
  } else if (type === 'warning') {
    toast.warning(message, toastOption);
  } else if (type === 'error') {
    toast.error(message, toastOption);
  } else if (type === 'info') {
    toast.info(message, toastOption);
  }
}

export default function Toast() {
  return <Container />;
}

export const Container = styled(ToastContainer)`
  .Toastify__toast {
    border-radius: 10px;
  }
`;
