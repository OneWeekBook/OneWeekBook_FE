import { useEffect, useState } from 'react';

function useAuthTimer() {
  const [emailDone, setEmailDone] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(3);

  useEffect(() => {
    if (emailDone === true) {
      const countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(countdown);
            setEmailDone(false);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [emailDone, minutes, seconds]);
  return { emailDone, setEmailDone, seconds, minutes };
}

export default useAuthTimer;
