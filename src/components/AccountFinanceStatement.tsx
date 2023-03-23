import React, { useState } from 'react';
import SelectInput from './common/SelectInput';

export default function AccountFinanceStatement() {
  const [paymentStatus, setPaymentStatus] = useState<string>('unpaid');
  return (
    <section>
      <Header />
      <div className="flex flex-col px-4 py-2 space-y-4">
        <p className="text-xl">Account Statement</p>
        <div className="flex items-center space-x-2 justify-start w-72">
          <label>Period</label>
          <SelectInput
            options={[
              '1 May 2022-19 May 2022',
              '12 May 2022-19 May 2022',
              '14 May 2022-19 May 2022',
            ]}
          />
        </div>
        <div className="w-full flex items-center justify-center bg-">
          <div className="w-2/3 bg-gray-100 h-96 space-y-5">
            <div className="space-x-3">
              <span
                className={`${
                  paymentStatus === 'paid'
                    ? 'text-white bg-success-primary'
                    : 'text-red-200 bg-gray-200'
                } px-2 py-1 capitalize`}
              >
                {paymentStatus}
              </span>
              {paymentStatus === 'unpaid' ? (
                <span className="px-2 py-1 ">
                  Estimated Date of Payout: 24 May 2022 - 25 May 2022
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-3/4 space-y-3">
                {paymentStatus === 'paid' ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <span>Payment was completed on:</span>
                      <span>2022-11-10</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Total Payout:</span>
                      <span>2500 NPR</span>
                    </div>
                  </div>
                ) : (
                  ''
                )}
                <div className="flex items-center justify-between px-2 py-1 bg-white">
                  <span>Total Balance</span>
                  <span>2500 NPR</span>
                </div>
                <div className="flex flex-col pl-10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Delivered Orders</span>
                    <span>2648.56 NPR</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Transaction Fees</span>
                      <span>2648.56 NPR</span>
                    </div>
                    <div className="pl-28 space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Commission Fees</span>
                        <span>500 NPR</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Shipping Fee Paid By Buyer</span>
                        <span>65 NPR</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center space-y-1">
                    <hr className="w-1/2" />
                    <div className="flex justify-end w-1/2 space-x-20 ">
                      <span>Subtotal</span>
                      <span>2500 NPR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="flex items-end w-full bg-white h-[82px] px-4 pt-2 text-2xl border-b-[3px] border-gray-300">
      <span className="">Finance</span>
    </div>
  );
}
