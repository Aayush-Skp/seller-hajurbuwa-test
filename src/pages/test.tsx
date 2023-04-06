import { useState } from 'react';
import Pdf from '../components/Pdf';

export default function Test() {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="flex justify-center">
      {clicked ? (
        <Pdf />
      ) : (
        <button onClick={() => setClicked((prev) => !prev)}>Click</button>
      )}
    </div>
  );
}
