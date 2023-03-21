import Image from 'next/image';
import { useState } from 'react';
import Info from '../../../public/icons/info.svg';
import TextInput from '../common/TextInput';

export default function ServicesAndDelivery() {
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState('kg');

  return (
    <div className="px-8 py-2 space-y-5">
      <div className="flex items-center space-x-3">
        <Image src={Info} alt="" />
        <p>Fields with asterisks* should be filled.</p>
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <p>Price*</p>
          <div className="flex items-center w-36">
            <TextInput
              value={weight}
              type="number"
              onChange={(e) => setWeight(e.target.valueAsNumber)}
              className="rounded-none"
            />
            <span className="h-10 w-10 flex items-center justify-center border border-gray-500">
              Kg
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
