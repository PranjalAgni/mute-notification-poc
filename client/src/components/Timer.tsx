import React, { useEffect, useRef } from 'react';

function Timer({
  seconds,
  setSeconds,
}: {
  seconds: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
}) {
  const timerId = useRef<null | ReturnType<typeof setInterval>>(null);

  const clearTimer = () => {
    if (timerId.current) clearInterval(timerId.current);
  };
  useEffect(() => {
    timerId.current = setInterval(() => {
      setSeconds((second) => second - 1);
    }, 1000);

    return () => clearTimer();
  }, [seconds, setSeconds]);

  useEffect(() => {
    if (seconds <= 0) clearTimer();
  }, [seconds]);

  return (
    <div>
      <h2>{seconds}</h2>
    </div>
  );
}

export default Timer;
