import Image from 'next/image';
import React, { useState } from 'react';
import InputLabel from '../common/InputLabel';
import TextInputField from '../common/TextInput';
import Info from '../../../public/icons/info.svg';

export default function ProductDetails() {
  const [bulletPoints, setBulletPoints] = useState([{ key: 1, value: '' }]);

  function addBulletPoints(e: React.KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e?.key === 'Enter' && bulletPoints.length < 5)
      setBulletPoints([
        ...bulletPoints,
        { key: bulletPoints.length + 1, value: '' },
      ]);
  }

  function removeFeaturedHightLight() {}

  return (
    <form className="px-8 py-2 space-y-5 w-full">
      <div className="flex items-center space-x-3">
        <Image src={Info} alt="" />
        <p>Fields with asterisks* should be filled.</p>
      </div>
      <div className="w-full space-y-10">
        <div className="flex space-x-2">
          <div className="w-[165px]">
            <InputLabel label="Featured Highlights" required />
          </div>
          <div className="w-full border border-gray-500 p-4 rounded">
            {bulletPoints.map((points, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-600 rounded-full" />
                <TextInputField
                  onKeyDown={addBulletPoints}
                  onChange={(e) => {
                    console.log(e.type);
                  }}
                  className="outline-none border-none focus:shadow-none p-5"
                />
                <button className="font-semibold border-2 border-gray-600 px-2 bg-gray-600 text-white rounded-full">
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="w-[165px]">
            <InputLabel label="Description" required />
          </div>
          <div className="w-full h-36">
            <textarea className="w-full h-full px-4 py-2 outline-none border border-gray-500" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex justify-center w-[165px] space-x-2">
            <InputLabel
              className="text-end"
              label="What’s in the Box?"
              required
            />
          </div>
          <TextInputField onChange={(e) => {}} />
        </div>
      </div>
    </form>
  );
}
