import { useEffect, useState } from 'react';

export function useTimer() {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setTimeout(() => setTimer((prev) => prev + 1), 1000);
  }, [timer]);

  return { timer };
}
