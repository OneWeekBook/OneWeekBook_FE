import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

type TimerTypes = {
  emailDone: boolean;
  setEmailDone: Dispatch<SetStateAction<boolean>>;
};

function TimerForm({ emailDone, setEmailDone }: TimerTypes) {
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

  return (
    <TimerWrapper>
      {minutes} : {seconds}
    </TimerWrapper>
  );
}

export default TimerForm;

const TimerWrapper = styled.span`
  color: red;
  font-size: 12px;
  margin-left: 5px;
`;
