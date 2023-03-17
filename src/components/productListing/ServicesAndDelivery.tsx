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
          <div>
            <TextInput
              value={weight}
              type="number"
              onChange={(e) => setWeight(e.target.valueAsNumber)}
              className="w-24 rounded-none"
            />
            <TextInput
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-16 rounded-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
