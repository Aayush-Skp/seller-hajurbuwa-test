import React from 'react';
import Button from '../common/Button';
import InputLabel from '../common/InputLabel';
import TextInput from '../common/TextInput';

export default function BankAccount() {
  return (
    <section>
      <form className="flex flex-col space-y-5">
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel className="text-xl" label="Account Name" />
          </div>
          <div className="w-80">
            <TextInput />
          </div>
        </div>
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel className="text-xl" label="Account Number" />
          </div>
          <div className="w-80">
            <TextInput />
          </div>
        </div>
        <div className="flex space-x-10 items-center">
          <div className="w-36">
            <InputLabel className="text-xl" label="Bank Name" />
          </div>
          <div className="w-80">
            <select className="w-full h-10 outline-none border border-black rounded cursor-pointer select-none">
              <option value="">select a bank</option>
              <option value="">Prabhu Bank</option>
              <option value="">Nabil bank</option>
              <option value="">NIC asia bank</option>
            </select>
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
