import React, { useRef } from 'react';
import InputLabel from '../components/common/InputLabel';
import TextInput from '../components/common/TextInput';

export default function Test() {
  const ref = useRef<any>(null);
  return (
    <form>
      <input type="file" ref={ref} className="bg-red-600" />
      <p onClick={ref.current}>click me</p>
    </form>
  );
}
