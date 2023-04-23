import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import BankAccount from '../../components/settings/BankAccount';
import authenticatedRoute from '../../components/WithAuth';
import Link from 'next/link';

function BankAccountPage() {
  return (
    <PageWrapper>
      <div>
        <div className="flex space-x-10">
          <div className="w-24 h-screen border-r border-black"></div>
          <div className="mt-4">
            <div className="bg-gray-200 p-3">
              <ul className="flex w-full space-x-20 text-3xl">
                <li className="cursor-pointer">
                  <Link href="/settings/account-info">
                    <a> Seller Info</a>
                  </Link>
                </li>
                <li className="border-b-[5px] border-accent-primary">
                  Bank Account
                </li>
                <li className="cursor-pointer">
                  <Link href="/settings/warehouse-address">
                    <a>Warehouse Address</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex py-10">
              <BankAccount />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default authenticatedRoute(BankAccountPage);
