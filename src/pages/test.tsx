import { useEffect, useState } from 'react';
import Pdf from '../components/Pdf';

export default function Test() {
  const [time, setTime] = useState(5);

  useEffect(() => {
    if (time !== 0) {
      console.log('inside');
      const timer = setInterval(() => setTime(time - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [time]);
  console.log(time);
  return <div className="flex justify-center mt-96">{time}</div>;
}
