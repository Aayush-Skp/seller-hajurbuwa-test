import React, { useEffect, useState } from 'react';
import {
  getFinanceDetails,
  getFinancePeriod,
} from '../services/financeService';
import Header from './Header';

export default function AccountFinanceStatement() {
  const [toggleTransactionFee, setToggleTransactionFee] = useState(false);
  const [toggleDeliveredOrders, setToggleDeliveredOrders] = useState(false);
  const [financeData, setFinanceData] = useState<any>({
    paymentStatus: 'paid',
  });

  const [sellerId, setSellerId] = useState('');

  const [dateList, setDateList] = useState<
    {
      start_date: string;
      end_date: string;
    }[]
  >([]);

  const [selectedDate, setSelectedDate] = useState<any>({
    start_date: '',
    end_date: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  function handleDateSelection(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value.split(',');

    setSelectedDate({
      start_date: value[0],
      end_date: value[1],
    });

    getFinanceDetails({
      sellerId,
      start_date: value[0],
      end_date: value[1],
    })
      .then((res) => {
        setFinanceData(res);
        console.log(res);
      })
      .catch(console.log);
  }

  useEffect(() => {
    try {
      const userDetails = localStorage.getItem('userDetails');

      if (typeof userDetails === 'string') {
        const details = JSON.parse(userDetails);

        let response: any;

        getFinancePeriod(1)
          .then((res) => {
            response = res;
            setDateList(res);
            setSellerId(details.id);
            setIsLoading(false);
            console.log(res);
          })
          .then(() => {
            if (response[0]?.start_date)
              getFinanceDetails({
                sellerId,
                start_date: response[0]?.start_date,
                end_date: response[0]?.end_date,
              })
                .then((res) => {
                  setFinanceData(res);
                  console.log(res);
                })
                .catch(console.log);
          });
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, []);

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <section>
      <Header header="Finance" />
      <div className="flex flex-col px-4 py-2 space-y-4">
        <p className="text-xl">Account Statement</p>
        <div className="flex items-center space-x-2 justify-start w-72">
          <label>Period</label>
          <select
            className="w-full h-10 border-[1px] border-gray-600 outline-none rounded focus:shadow-[1px_-1px_8px_rgba(0,0,0,0.30)] transition-shadow duration-300 cursor-pointer"
            onChange={handleDateSelection}
          >
            {dateList.map((date) => (
              <option
                key={date.end_date}
                value={`${date.start_date},${date.end_date}`}
              >
                <span>
                  {formatDate(date.start_date)} - {formatDate(date.end_date)}
                </span>
              </option>
            ))}
          </select>
        </div>
        <div className="w-full flex items-center justify-center bg-">
          <div className="w-2/3 bg-gray-100 h-96 space-y-5">
            <div className="space-x-3">
              <span
                className={`${
                  financeData?.status === 'paid'
                    ? 'text-white bg-success-primary'
                    : 'text-red-200 bg-gray-200'
                } px-2 py-1 capitalize`}
              >
                {financeData?.status}
              </span>
              {financeData?.status === 'unpaid' ? (
                <span className="px-2 py-1 ">
                  Estimated Date of Payout:{' '}
                  {formatDate(selectedDate.start_date)} -
                  {formatDate(selectedDate.end_date)}
                </span>
              ) : (
                ''
              )}
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="w-3/4 space-y-3">
                {financeData?.status === 'paid' ? (
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
                    <div>
                      <div className="flex items-center space-x-2 select-none cursor-pointer">
                        <span
                          onClick={() =>
                            setToggleDeliveredOrders((prev) => !prev)
                          }
                        >
                          Delivered Orders
                        </span>
                        {!toggleDeliveredOrders ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 15.75l7.5-7.5 7.5 7.5"
                            />
                          </svg>
                        )}
                      </div>
                      {toggleDeliveredOrders ? (
                        <div className="flex justify-end">
                          <div className="text-accent-primary text-sm flex flex-col space-y-2 mt-1">
                            <span>12345</span>
                            <span>89895</span>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <span>2648.56 NPR</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        onClick={() => setToggleTransactionFee((prev) => !prev)}
                        className="flex items-center space-x-2 select-none cursor-pointer"
                      >
                        <span>Transaction Fees</span>
                        {!toggleTransactionFee ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 15.75l7.5-7.5 7.5 7.5"
                            />
                          </svg>
                        )}
                      </div>
                      <span>2648.56 NPR</span>
                    </div>
                    {toggleTransactionFee ? (
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
                    ) : null}
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
