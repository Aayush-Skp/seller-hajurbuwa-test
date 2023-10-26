import React from 'react';
import PageWrapper from '../../components/PageWrapper';
import BankAccount from '../../components/settings/BankAccount';
import authenticatedRoute from '../../components/WithAuth';
import Link from 'next/link';
import Head from 'next/head';

function BankAccountPage() {
  return <>
    <Head>
      <meta name="viewport" content="width=1360" />
    </Head>
    <PageWrapper>
      <div>
        <div className="flex space-x-10">
          <div className="w-24 h-screen border-r border-black"></div>
          <div className="mt-4">
            <div className="bg-gray-100 px-3 pt-3">
              <ul className="flex w-full space-x-20 text-xl">
                <li className="cursor-pointer">
                  <Link href="/settings/account-info">
                     Seller Info
                  </Link>
                </li>
                <li className="border-b-[5px] border-blue-700">
                  Bank Account
                </li>
                <li className="cursor-pointer">
                  <Link href="/settings/warehouse-address">
                    Warehouse Address
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
  </>;
}

export default authenticatedRoute(BankAccountPage);
