import React, { useEffect, useState } from 'react';
import {
  getFinanceDetails,
  getFinancePeriod,
} from '../services/financeService';
import Image from 'next/image';
import logo from '../../public/icons/hajurbuwa-logo.svg';
import Link from 'next/link';

export default function AccountFinanceStatement() {
  const [toggleTransactionFee, setToggleTransactionFee] = useState(false);
  const [toggleDeliveredOrders, setToggleDeliveredOrders] = useState(false);
  const [totalDeliveryAmount, setTotalDeliveryAmount] = useState(0);
  const [estimatedDateOfPayout, setEstimatedDateOfPayout] = useState<any>({
    start_date: '',
    end_date: '',
  });

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

        getFinancePeriod(details.id)
          .then((res) => {
            setDateList(res);
            setSellerId(details.id);
            setIsLoading(false);
            setSelectedDate({
              start_date: res[0]?.start_date,
              end_date: res[0]?.end_date,
            });

            return res;
          })
          .then((res) => {
            let startDate = new Date(res[0]?.end_date);
            let endDate = new Date(res[0]?.end_date);

            setEstimatedDateOfPayout({
              start_date: formatDate(
                startDate.setDate(startDate.getDate() + 5)
              ),
              end_date: formatDate(endDate.setDate(endDate.getDate() + 6)),
            });

            return res;
          })
          .then((response) => {
            if (response[0]?.start_date)
              getFinanceDetails({
                sellerId: details.id,
                start_date: response[0]?.start_date,
                end_date: response[0]?.end_date,
              })
                .then((res) => {
                  setFinanceData(res);
                  return res;
                })
                .then((res) => {
                  let total = 0;

                  for (const order of res.DeliveredOrder) {
                    total += order?.total_amount;
                  }
                  setTotalDeliveryAmount(total);
                })
                .catch(console.log);
          });
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, []);

  console.log(estimatedDateOfPayout);

  function formatDate(date: string | number | Date) {
    return new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  if (isLoading)
    return (
      <div>
        <div className="flex items-center justify-center h-screen animate-ping">
          <Image height={50} width={50} src={logo} alt="logo" />
        </div>
      </div>
    );

  return (
    <section>
      <div className="flex flex-col px-4 py-2 space-y-4">
        <div className="flex items-end w-full bg-white h-[82px] px-4 pt-2 text-2xl border-b-[3px] border-gray-300">
          <span className="">Finance</span>
        </div>
        {dateList.length === 0 ? (
          <span className="w-full flex justify-center">No data available</span>
        ) : (
          <>
            <div className="flex items-center space-x-16">
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
                        {formatDate(date.start_date)} -{' '}
                        {formatDate(date.end_date)}
                      </span>
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <span>Seller Name: {financeData?.seller_company_name}</span>
              </div>
            </div>

            <div className="w-full flex items-center justify-center bg-">
              <div className="w-2/3 bg-gray-100 h-96 space-y-5">
                <div className="space-x-3">
                  <span
                    className={`${
                      financeData?.status === 'paid'
                        ? 'text-white bg-success-primary'
                        : 'text-red-600 bg-gray-200'
                    } px-2 py-1 capitalize`}
                  >
                    {financeData?.status}
                  </span>
                  {financeData?.status === 'unpaid' ? (
                    <span className="px-2 py-1 ">
                      Estimated Date of Payout:{' '}
                      {estimatedDateOfPayout.start_date} -{' '}
                      {estimatedDateOfPayout.end_date}
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
                          <span>{financeData.total_amount} NPR</span>
                        </div>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="flex items-center justify-between px-2 py-1 bg-white">
                      <span>Total Balance</span>
                      <span>
                        {`${
                          totalDeliveryAmount -
                          financeData?.transactionFee?.commission_fee -
                          financeData?.transactionFee?.shipping_fee
                        } NPR`}
                      </span>
                    </div>
                    <div className="flex flex-col pl-10 space-y-3">
                      <div>
                        <div className="flex justify-between">
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
                          <span>{totalDeliveryAmount} NPR</span>
                        </div>
                        {toggleDeliveredOrders ? (
                          <div className="flex justify-end w-full pl-28">
                            <div className="text-accent-primary w-full text-sm flex flex-col space-y-2 mt-1">
                              <ul className="w-full space-y-1">
                                {financeData?.DeliveredOrder.map(
                                  (order: any) => (
                                    <li
                                      className="flex justify-between w-full"
                                      key={order?.id}
                                    >
                                      <Link
                                        href={`/order?order_id=${order.id}`}
                                      >
                                        <a target="_blank">{order?.order_id}</a>
                                      </Link>
                                      <span className="text-black">
                                        {order?.total_amount} NPR
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        ) : null}
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div
                            onClick={() =>
                              setToggleTransactionFee((prev) => !prev)
                            }
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
                          <span>
                            {`-${
                              financeData?.transactionFee?.commission_fee +
                              financeData?.transactionFee?.shipping_fee
                            } NPR`}
                          </span>
                        </div>
                        {toggleTransactionFee ? (
                          <div className="pl-28 space-y-2">
                            <div className="flex items-center justify-between">
                              <span>Commission Fees</span>
                              <span>
                                -{financeData?.transactionFee?.commission_fee}{' '}
                                NPR
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Shipping Fee Paid By Buyer</span>
                              <span>
                                -{financeData?.transactionFee?.shipping_fee} NPR
                              </span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center space-y-1">
                      <hr className="w-1/2" />
                      <div className="flex justify-end w-1/2 space-x-20 ">
                        <span>Subtotal</span>
                        <span>
                          {`${
                            totalDeliveryAmount -
                            financeData?.transactionFee?.commission_fee -
                            financeData?.transactionFee?.shipping_fee
                          } NPR`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
