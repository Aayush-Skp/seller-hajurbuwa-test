import Image from 'next/image';
import { useEffect, useState } from 'react';
import Info from '../../../public/icons/info.svg';
import CheckboxInput from '../common/CheckboxInput';
import InputLabel from '../common/InputLabel';
import RadioInput from '../common/RadioInput';
import TextInput from '../common/TextInput';

export default function PriceAndStock() {
  const [currency, setCurrency] = useState('NPR');
  const [price, setPrice] = useState('');

  useEffect(() => {}, []);
  return (
    <div className="px-8 py-2 space-y-5">
      <div className="flex items-center space-x-3">
        <Image src={Info} alt="" />
        <p>Fields with asterisks* should be filled.</p>
      </div>
      <div className="space-y-10">
        <div className="flex items-center space-x-2">
          <p>Price*</p>
          <div className="flex items-center">
            <span className="h-10 w-10 flex items-center justify-center border border-gray-500">
              NPR
            </span>
            <TextInput
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              className="w-[7.5rem] rounded-none"
            />
          </div>
        </div>

        <div className="flex max-w-max justify-center items-center space-x-2">
          <InputLabel
            htmlFor="bulk_price"
            label="Click here to add bulk pricing "
          />
          <CheckboxInput id="bulk_price" />
        </div>

        <div className="flex items-center space-x-5">
          <p>Stock Availability*</p>
          <div className="flex items-center justify-center">
            <InputLabel htmlFor="yes" label="Yes" />
            <RadioInput id="yes" name="stock" />
          </div>
          <div className="flex items-center justify-center">
            <InputLabel label="No" htmlFor="no" />
            <RadioInput id="no" name="stock" />
          </div>
        </div>
      </div>
    </div>
  );
}
