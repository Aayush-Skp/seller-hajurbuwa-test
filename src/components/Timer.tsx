import React, { useEffect, useState } from 'react';

export default function Timer({ time }: { time: number }) {
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    const timeOut = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return clearTimeout(timeOut);
  }, [timer, time]);

  return <div>Timer: {timer}</div>;
}
