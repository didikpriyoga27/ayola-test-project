import {useEffect, useState} from 'react';

const useCountdownTimer = (
  initialSeconds: number,
  shouldReset: boolean,
  setShouldResetTimer: (v: boolean) => void,
) => {
  const [timer, setTimer] = useState(initialSeconds);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0 && shouldReset) {
      clearInterval(interval);
      setTimer(initialSeconds);
      setShouldResetTimer(false);
    }

    return () => clearInterval(interval as NodeJS.Timeout);
  }, [timer, initialSeconds, shouldReset, setShouldResetTimer]);

  return timer;
};

export default useCountdownTimer;
