import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import BankAccount from '../../components/settings/BankAccount';

export default function BankAccountPage() {
  return (
    <div>
      <div className="flex space-x-10">
        <div className="w-24 h-screen border-r border-black"></div>
        <div className="mt-4">
          <div className="bg-gray-200 p-3">
            <ul className="flex w-full space-x-20 text-3xl">
              <li>Seller Info</li>
              <li className="border-b-[5px] border-accent-primary">
                Bank Account
              </li>
              <li>Warehouse Address</li>
            </ul>
          </div>
          <div className="flex py-10">
            <BankAccount />
          </div>
        </div>
      </div>
    </div>
  );
}
