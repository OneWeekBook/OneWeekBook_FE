import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TimerTextTypes } from 'types/atom';

function TimerText({ emailDone, setEmailDone }: TimerTextTypes) {
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
    <TimerTextAtom>
      {minutes} : {seconds}
    </TimerTextAtom>
  );
}

export default TimerText;

const TimerTextAtom = styled.span`
  color: ${({ theme }) => theme.color.COLOR_RED};
  font-size: 1.2rem;
  margin-left: 5px;
`;
