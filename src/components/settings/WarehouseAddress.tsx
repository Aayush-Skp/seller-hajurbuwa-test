import React from 'react';
import Button from '../common/Button';
import InputLabel from '../common/InputLabel';
import TextInput from '../common/TextInput';

export default function WarehouseAddress() {
  return (
    <section>
      <form className="flex flex-col space-y-5">
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel required className="text-xl" label="State" />
          </div>
          <div className="w-80">
            <select className="w-full h-10 outline-none border border-black rounded cursor-pointer select-none">
              <option value="">select a state</option>
              <option value="">Koshi</option>
              <option value="">Bagmati</option>
              <option value="">Sagarmatha</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel required className="text-xl" label="City" />
          </div>
          <div className="w-80">
            <select className="w-full h-10 outline-none border border-black rounded cursor-pointer select-none">
              <option value="">select a city</option>
              <option value="">Kathmandu</option>
              <option value="">Biratnagar</option>
              <option value="">Dharan</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel required className="text-xl" label="Area" />
          </div>
          <div className="w-80">
            <select className="w-full h-10 outline-none border border-black rounded cursor-pointer select-none">
              <option value="">select a area</option>
              <option value="">Baneshowr</option>
              <option value="">Koteshowr</option>
              <option value="">Sinamangal</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel required className="text-xl" label="Address Line 1" />
          </div>
          <div className="w-80">
            <TextInput />
          </div>
        </div>
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel required className="text-xl" label="Address Line 2" />
          </div>
          <div className="w-80">
            <TextInput />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="w-36">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </form>
    </section>
  );
}
